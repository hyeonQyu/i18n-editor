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
  DeleteContentRowReq,
  DeleteContentRowRes,
  PostContentColumnReq,
  PostContentColumnRes,
  DeleteContentColumnReq,
  DeleteContentColumnRes,
  GetFileExplorerReq,
  GetFileExplorerRes,
} from 'i18n-editor-common';
import * as fs from 'fs';
import { FileSystemManager } from '../utils/fileSystemManager';
import { PostContentRowReq, PostContentRowRes } from 'i18n-editor-common/lib/defines/models';
import { ContentUtil } from '../utils/contentUtil';
import { ServiceCache } from '../defines/types';
import childProcess from 'child_process';

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
   * 파일 익스플로러 열기
   * @param req
   */
  export function getFileExplorer(req: GetFileExplorerReq): GetFileExplorerRes {
    try {
      const { path } = req;

      childProcess.execSync(`start "" "${path}"`);
      console.log(`file explorer opened with path: ${path}`);

      return { status: 200 };
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

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { rows, columns } = contentData;

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

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { translationFiles, rows } = contentData;

      if (!ContentUtil.compareRowKeys(rows, cache.lastReadRows)) {
        const errorMessage = 'Keys changed by external write';
        console.error(errorMessage);
        return { status: 998, errorMessage };
      }

      const newRows = [...rows.slice(0, row.index), row, ...rows.slice(row.index)];
      ContentUtil.writeTranslationFilesByChangedRows(translationFiles, newRows);
      cache.lastReadRows = newRows;

      return { status: 200 };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 행 삭제
   * @param req
   */
  export function deleteContentRow(req: DeleteContentRowReq): DeleteContentRowRes {
    try {
      const { path, fileName, key } = req;

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage = 'Invalid locale directory';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { translationFiles, rows } = contentData;

      if (!ContentUtil.compareRowKeys(rows, cache.lastReadRows)) {
        const errorMessage = 'Keys changed by external write';
        console.error(errorMessage);
        return { status: 998, errorMessage };
      }

      const newRows = rows.filter((row) => row.key !== key);
      ContentUtil.writeTranslationFilesByChangedRows(translationFiles, newRows);
      cache.lastReadRows = newRows;

      return { status: 200 };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 열 추가
   * @param req
   */
  export function postContentColumn(req: PostContentColumnReq): PostContentColumnRes {
    try {
      const { path, fileName, languageCode } = req;

      const directoryPath = `${path}/${languageCode}`;
      if (fs.existsSync(directoryPath)) {
        return { status: 999, errorMessage: `(${languageCode}) is Duplicated` };
      }
      fs.mkdirSync(directoryPath);
      console.log(`directory: ${directoryPath}`);

      const filePath = `${directoryPath}/${fileName}`;
      FileSystemManager.createFileWhenNotExist(filePath, '{}');
      console.log(`file: ${filePath}`);

      return getContent({ path, fileName });
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }

  /**
   * 열 삭제
   * @param req
   */
  export function deleteContentColumn(req: DeleteContentColumnReq): DeleteContentColumnRes {
    try {
      const { path, fileName, languageCode } = req;

      const directoryPath = `${path}/${languageCode}`;
      FileSystemManager.removeDirectory(directoryPath);
      console.log(`directory removed: ${directoryPath}`);

      return getContent({ path, fileName });
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
