import { FileData, JsonObject } from '../defines/types';
import { ColumnData, LanguageCode, RowData, StringUtil, LANGUAGE_CODE_SET } from 'i18n-editor-common';
import { FileSystemManager } from './fileSystemManager';
import fs from 'fs';

export namespace ContentUtil {
  /**
   * 언어 코드명으로 이름 지어진 디렉토리 이름 목록 반환
   * @param rootDirectoryPath
   */
  export function getDirectoryPathsByRootDirectoryPath(rootDirectoryPath: string) {
    return fs
      .readdirSync(rootDirectoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && LANGUAGE_CODE_SET.has(entry.name))
      .map((entry) => `${rootDirectoryPath}/${entry.name}`);
  }

  /**
   * 디렉토리 경로 목록으로부터 언어 코드 목록을 반환
   * @param directoryPaths
   */
  export function getLanguageCodesFromDirectoryPaths(directoryPaths: string[]): LanguageCode[] {
    return directoryPaths.map(StringUtil.getLastEntryFromPath<LanguageCode>);
  }

  /**
   * 디렉토리 경로 목록으로부터 모든 번역 파일 이름 목록을 반환
   * @param directoryPaths
   */
  export function getAllTranslationFileNamesFromDirectoryPaths(directoryPaths: string[]): string[] {
    return FileSystemManager.getFileNames(directoryPaths, ['json']);
  }

  /**
   * 주어진 디렉토리 목록으로부터 해당하는 파일 이름을 가진 파일을 객체 형식으로 변환하여 반환, 파일이 없다면 생성
   * @param directoryNames 파일이 위치한 디렉토리 이름
   * @param fileName 파일 이름
   */
  export function getFileDataListFromDirectoryNamesWithFileName(directoryNames: string[], fileName: string): FileData[] {
    return directoryNames.map((directory) => {
      const filePath = `${directory}/${fileName}`;
      FileSystemManager.createFileWhenNotExist(filePath, '{}');

      return {
        path: filePath,
        content: FileSystemManager.readFile(filePath),
        language: StringUtil.getLastEntryFromPath<LanguageCode>(directory),
      };
    });
  }

  /**
   * 번역 내용 목록과 언어 코드 목록으로부터 언어 별 번역 정보 반환
   * @param contents
   * @param languageCodes
   */
  export function getTranslationDataByKeyFromContentsAndLanguageCodes(
    contents: JsonObject[],
    languageCodes: LanguageCode[],
  ): Record<string, JsonObject> {
    // key 별 번역 데이터
    const translationDataByKey: Record<string, JsonObject> = {};

    // 기본 번역 데이터
    const defaultTranslationData = languageCodes.reduce((acc, language) => {
      return {
        ...acc,
        [language]: '',
      };
    }, {});

    contents.forEach((content, i) => {
      const language = languageCodes[i];
      Object.entries(content).forEach(([key, translation]) => {
        if (!translationDataByKey[key]) {
          translationDataByKey[key] = {
            ...defaultTranslationData,
            [language]: translation,
          };
        } else {
          translationDataByKey[key]![language] = translation;
        }
      });
    });

    return translationDataByKey;
  }

  /**
   * 언어 코드 목록으로부터 테이블 열 데이터 목록 반환
   * @param languageCodes
   */
  export function getColumnDataListFromLanguageCodes(languageCodes: LanguageCode[]): ColumnData[] {
    return [{ header: 'key' }, ...languageCodes.map((language) => ({ header: language }))];
  }

  /**
   * 언어 별 번역 정보로부터 테이블 행 데이터 목록 반환
   * @param translationDataByKey
   */
  export function getRowDataListFromTranslationDataByKey(translationDataByKey: Record<string, JsonObject>) {
    return Object.entries(translationDataByKey).map(([key, translationData], index) => {
      return {
        key,
        index,
        ...translationData,
      };
    });
  }

  /**
   * 새로운 번역 정보 생성
   * @param rows
   * @param languageCode
   */
  export function getNewContentByRowsAndLanguageCode(rows: RowData[], languageCode: LanguageCode): JsonObject {
    return rows.reduce((acc, row) => {
      return {
        ...acc,
        [row.key]: row[languageCode] ?? '',
      };
    }, {} as JsonObject);
  }

  /**
   * 두 개의 row 목록의 키 값 비교
   * @param rows1
   * @param rows2
   */
  export function compareRowKeys(rows1: RowData[], rows2: RowData[]): boolean {
    if (rows1.length !== rows2.length) return false;

    const compareRowByKey = (row1: RowData, row2: RowData) => {
      if (row1.key > row2.key) return -1;
      else if (row1.key < row2.key) return 1;
      return 0;
    };

    const cloneRows1 = [...rows1].sort(compareRowByKey);
    const cloneRows2 = [...rows2].sort(compareRowByKey);

    for (let i = 0; i < cloneRows1.length; i++) {
      const row1 = cloneRows1[i];
      const row2 = cloneRows2[i];

      if (row1.key !== row2.key) return false;
    }

    return true;
  }

  /**
   * 번역 파일 관련 필요한 정보 반환
   * @param path
   * @param fileName
   */
  export function getContentDataFromPathWithFileName(
    path: string,
    fileName: string,
  ): {
    translationFiles: FileData[];
    languages: LanguageCode[];
    translationDataByKey: Record<string, JsonObject>;
    rows: RowData[];
    columns: ColumnData[];
  } | null {
    const directories = getDirectoryPathsByRootDirectoryPath(path);

    if (directories.length === 0) return null;

    const translationFiles = getFileDataListFromDirectoryNamesWithFileName(directories, fileName);
    const contents = translationFiles.map(({ content }) => content);
    const languages = getLanguageCodesFromDirectoryPaths(directories);
    const translationDataByKey = getTranslationDataByKeyFromContentsAndLanguageCodes(contents, languages);
    const rows = getRowDataListFromTranslationDataByKey(translationDataByKey);
    const columns = getColumnDataListFromLanguageCodes(languages);

    return {
      translationFiles,
      languages,
      translationDataByKey,
      rows,
      columns,
    };
  }

  /**
   * 변경 사항 번역 파일에 쓰기
   * @param translationFiles
   * @param rows
   */
  export function writeTranslationFilesByChangedRows(translationFiles: FileData[], rows: RowData[]) {
    translationFiles.forEach(({ path, language }) => {
      const content = ContentUtil.getNewContentByRowsAndLanguageCode(rows, language);
      FileSystemManager.writeFile(path, content);
    });
  }
}
