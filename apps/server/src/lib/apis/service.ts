import {
  ColumnData,
  DirectoryEntry,
  DirectoryEntryType,
  GetDirectoryReq,
  GetDirectoryRes,
  GetContentReq,
  GetContentRes,
  RowData,
  StringUtil,
  GetTranslationFileReq,
  GetTranslationFileRes,
} from 'i18n-editor-common';
import * as fs from 'fs';
import { FileSystemManager } from '../utils/fileSystemManager';

export namespace Service {
  /**
   * 디렉토리 내 파일 (entry) 목록
   * @param req
   */
  export function getDirectory(req: GetDirectoryReq): GetDirectoryRes {
    try {
      const path = StringUtil.getNormalizedPath(req?.path || process.cwd());
      const entries: DirectoryEntry[] = fs.readdirSync(path, { withFileTypes: true }).map((item) => {
        const type: DirectoryEntryType = (() => {
          if (item.isDirectory()) return 'directory';
          if (item.isFile()) return 'file';
          return 'unknown';
        })();

        return {
          name: item.name,
          type,
        };
      });

      console.log(`files from ${path}`);
      console.log(entries);

      return { status: 200, data: { path, entries } };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 다국어 번역 파일 목록
   * @param req
   */
  export function getTranslationFiles(req: GetTranslationFileReq): GetTranslationFileRes {
    try {
      const { path } = req;

      const directories = FileSystemManager.getTranslationDirectoryNames(path);

      if (directories.length === 0) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const files = FileSystemManager.getFileNames(directories, ['json']);

      console.log('valid locale directory');
      console.log(files);

      return { status: 200, data: { files } };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 번역 파일 내용 조회
   * @param req
   */
  export function getContent(req: GetContentReq): GetContentRes {
    try {
      const { path, fileName } = req;

      const directories = FileSystemManager.getTranslationDirectoryNames(path);

      if (directories.length === 0) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const contents = FileSystemManager.getFilesFromDirectoriesByFileName(directories, fileName);

      // 언어 코드 (폴더 이름) 목록
      const languages = directories.map((directory) => directory.slice(directory.lastIndexOf('/') + 1));
      // 기본 번역 데이터
      const defaultTranslationData = languages.reduce((acc, language) => {
        return {
          ...acc,
          [language]: '',
        };
      }, {});
      // key 별 번역 데이터
      const translationDataByKey: { [key in string]?: { [key in string]?: string } } = {};

      contents.forEach((content, i) => {
        const language = languages[i];
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

      const columns: ColumnData[] = [{ header: 'key' }, ...languages.map((language) => ({ header: language }))];
      const rows: RowData[] = Object.entries(translationDataByKey).map(([key, translationData]) => {
        return {
          key,
          ...translationData,
        };
      });

      console.log('column data', columns);
      console.log('row data', rows);

      return { status: 200, data: { columns, rows } };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
