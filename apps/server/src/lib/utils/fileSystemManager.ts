import fs from 'fs';
import { StringUtil } from 'i18n-editor-common';
import { JsonObject } from '../defines/types';

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
   * JSON 파일 읽어서 object 반환
   * @param filePath
   */
  export function readFile(filePath: string): JsonObject {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  /**
   * JSON object 쓰기
   * @param filePath
   * @param jsonObject
   */
  export function writeFile(filePath: string, jsonObject: JsonObject) {
    fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 2));
  }

  export function removeDirectory(directoryPath: string) {
    fs.rm(
      directoryPath,
      {
        recursive: true,
        force: true,
      },
      () => {},
    );
  }
}
