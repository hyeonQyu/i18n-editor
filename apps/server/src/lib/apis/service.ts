import {
  DirectoryEntry,
  DirectoryEntryType,
  GetDirectoryReq,
  GetDirectoryRes,
  GetContentReq,
  GetContentRes,
  StringUtil,
  GetTranslationFileReq,
  GetTranslationFileRes,
  PatchContentReq,
  PatchContentRes,
} from 'i18n-editor-common';
import * as fs from 'fs';
import { FileSystemManager } from '../utils/fileSystemManager';
import { PostContentRowReq, PostContentRowRes } from 'i18n-editor-common/lib/defines/models';
import { ContentUtil } from '../utils/contentUtil';
import { ServiceCache } from '../defines/types';

export namespace Service {
  const cache: ServiceCache = {
    lastReadRows: [],
  };

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

      const directories = ContentUtil.getDirectoryPathsByRootDirectoryPath(path);

      if (directories.length === 0) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const files = ContentUtil.getAllTranslationFileNamesFromDirectoryPaths(directories);

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

      const directories = ContentUtil.getDirectoryPathsByRootDirectoryPath(path);

      if (directories.length === 0) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const contents = ContentUtil.getFileDataListFromDirectoryNamesWithFileName(directories, fileName).map(({ content }) => content);
      const languages = ContentUtil.getLanguageCodesFromDirectoryPaths(directories);
      const translationDataByKey = ContentUtil.getTranslationDataByKeyFromContentsAndLanguageCodes(contents, languages);

      const columns = ContentUtil.getColumnDataListFromLanguageCodes(languages);
      const rows = ContentUtil.getRowDataListFromTranslationDataByKey(translationDataByKey);
      cache.lastReadRows = rows;

      console.log('column data', columns);
      console.log('row data', rows);

      return { status: 200, data: { columns, rows } };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 번역 파일 수정
   * @param req
   */
  export function patchContent(req: PatchContentReq): PatchContentRes {
    try {
      const { path, fileName, cells } = req;

      cells.forEach(({ locale, key, value }) => {
        const filePath = `${path}/${locale}/${fileName}`;
        const content = FileSystemManager.readFile(filePath);
        content[key] = value;
        FileSystemManager.writeFile(filePath, content);

        console.log(`edit: ${locale}) [${key}]: ${value}`);
      });

      return { status: 200 };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 행 추가
   * @param req
   */
  export function postContentRow(req: PostContentRowReq): PostContentRowRes {
    try {
      const { path, fileName, row } = req;

      const directories = ContentUtil.getDirectoryPathsByRootDirectoryPath(path);

      if (directories.length === 0) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const translationFiles = ContentUtil.getFileDataListFromDirectoryNamesWithFileName(directories, fileName);
      const contents = translationFiles.map(({ content }) => content);
      const languages = ContentUtil.getLanguageCodesFromDirectoryPaths(directories);
      const translationDataByKey = ContentUtil.getTranslationDataByKeyFromContentsAndLanguageCodes(contents, languages);
      const rows = ContentUtil.getRowDataListFromTranslationDataByKey(translationDataByKey);

      if (!ContentUtil.compareRowKeys(rows, cache.lastReadRows)) {
        const errorMessage = 'Keys changed by external write';
        console.error(errorMessage);
        return { status: 998, errorMessage };
      }

      const newRows = [...rows.slice(0, row.index), row, ...rows.slice(row.index)];

      translationFiles.forEach(({ path, language }) => {
        const content = ContentUtil.getNewContentByRowsAndLanguageCode(newRows, language);
        FileSystemManager.writeFile(path, content);
      });

      cache.lastReadRows = newRows;

      return { status: 200 };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
