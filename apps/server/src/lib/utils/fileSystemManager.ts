import fs from 'fs';
import { LANGUAGE_CODE_SET } from 'i18n-editor-common/lib/defines/constants';
import { StringUtil } from 'i18n-editor-common';

export namespace FileSystemManager {
  /**
   * 디렉토리가 없는 경우 생성
   * @param directoryPath 디렉토리 경로
   */
  export function createDirectoryWhenNotExist(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
  }

  /**
   * 파일이 없는 경우 생성
   * @param filePath 파일 경로
   * @param content 파일을 생성할 때 기본으로 작성할 내용
   */
  export function createFileWhenNotExist(filePath: string, content: string = '') {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
    }
  }

  /**
   * 언어 코드명으로 이름 지어진 디렉토리 이름 목록 반환
   * @param rootPath
   */
  export function getTranslationDirectoryNames(rootPath: string): string[] {
    return fs
      .readdirSync(rootPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && LANGUAGE_CODE_SET.has(entry.name))
      .map((entry) => `${rootPath}/${entry.name}`);
  }

  /**
   * 여러 디렉토리 내에 있는 중복 없는 파일 이름 목록 반환
   * @param directories 파일이 위치한 디렉토리 목록
   * @param validFileExtensions 유효한 파일 확장자 목록
   */
  export function getFileNames(directories: string[], validFileExtensions: string[]): string[] {
    const validFileExtensionSet = new Set<string>(validFileExtensions);

    const filesWithDuplication = directories.reduce((acc: string[], directory) => {
      const files = fs
        .readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && validFileExtensionSet.has(StringUtil.getExtensionName(entry.name) as string))
        .map((entry) => entry.name);

      return [...acc, ...files];
    }, []);

    return Array.from(new Set(filesWithDuplication));
  }

  /**
   * 주어진 디렉토리 목록으로부터 해당하는 파일 이름을 가진 파일을 객체 형식으로 변환하여 반환, 파일이 없다면 생성
   * @param directories 파일이 위치한 디렉토리
   * @param fileName 파일 이름
   */
  export function getFilesFromDirectoriesByFileName(directories: string[], fileName: string): { [key in string]: string }[] {
    return directories.map((directory) => {
      const filePath = `${directory}/${fileName}`;
      FileSystemManager.createFileWhenNotExist(filePath, '{}');
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });
  }
}
