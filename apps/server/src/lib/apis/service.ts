import {
  CommonRes,
  DirectoryEntry,
  DirectoryEntryType,
  DirectoryReq,
  DirectoryRes,
  StringUtil,
  TranslationFileReq,
  TranslationFileRes,
} from 'i18n-editor-common';
import * as fs from 'fs';
import { LANGUAGE_CODE_SET } from 'i18n-editor-common/lib/defines/constants';

export namespace Service {
  /**
   * 디렉토리 내 파일 (entry) 목록
   * @param req
   */
  export function getDirectory(req: DirectoryReq): CommonRes<DirectoryRes> {
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

      const data: DirectoryRes = { path, entries };

      console.log(`files from ${path}`);
      console.log(entries);

      return { status: 200, data };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 다국어 번역 파일 목록
   * @param req
   */
  export function getTranslationFiles(req: TranslationFileReq): CommonRes<TranslationFileRes> {
    try {
      const { path } = req;

      const localeDirectories: string[] = fs
        .readdirSync(path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && LANGUAGE_CODE_SET.has(entry.name))
        .map((entry) => entry.name);

      if (localeDirectories.length === 0) {
        throw new Error('Invalid locale directory');
      }

      const filesWithDuplication = localeDirectories.reduce((acc: string[], directory) => {
        const translationFiles = fs
          .readdirSync(`${path}/${directory}`, { withFileTypes: true })
          .filter((entry) => entry.isFile() && StringUtil.getExtensionName(entry.name) === 'json')
          .map((entry) => entry.name);

        return [...acc, ...translationFiles];
      }, []);

      const files = Array.from(new Set(filesWithDuplication));

      console.log('valid locale directory');
      console.log(files);

      return { status: 200, data: { files } };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
