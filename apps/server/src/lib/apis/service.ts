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
  CommonRes,
  ErrorMessage,
  PostDirectoryReq,
  PostDirectoryRes,
  PostTranslationFileReq,
  PostTranslationFileRes,
  GetConfigRes,
} from 'i18n-editor-common';
import * as fs from 'fs';
import { FileSystemManager } from '../utils/fileSystemManager';
import { PostContentRowReq, PostContentRowRes } from 'i18n-editor-common/lib/defines/models';
import { ContentUtil } from '../utils/contentUtil';
import { ServiceCache } from '../defines/types';
import childProcess from 'child_process';
import { ConfigUtil } from '../utils/configUtil';

export namespace Service {
  const cache: ServiceCache = {
    lastReadRows: [],
  };

  /**
   * 설정 불러오기
   */
  export function getConfig(): GetConfigRes {
    const config = ConfigUtil.read();
    return { status: 200, data: { config } };
  }

  /**
   * 디렉토리 내 파일 (entry) 목록
   * @param req
   */
  export function getDirectory(req: GetDirectoryReq): GetDirectoryRes {
    return doService<GetDirectoryRes>(() => {
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
    });
  }

  /**
   * 디렉토리 및 번역 파일 생성
   * @param req
   */
  export function postDirectory(req: PostDirectoryReq): PostDirectoryRes {
    return doService<PostDirectoryRes>(() => {
      const { path, directoryName, fileName } = req;

      const directoryPath = `${path}/${directoryName}`;
      FileSystemManager.createDirectoryWhenNotExist(directoryPath);
      console.log(`directory: ${directoryPath}`);

      const filePath = `${directoryPath}/${fileName}`;
      FileSystemManager.createFileWhenNotExist(filePath, '{}');
      console.log(`file: ${filePath}`);

      return { status: 200, data: { fileName } };
    });
  }

  /**
   * 파일 탐색기 열기
   * @param req
   */
  export function getFileExplorer(req: GetFileExplorerReq): GetFileExplorerRes {
    return doService<GetFileExplorerRes>(() => {
      const { path } = req;

      childProcess.execSync(`start "" "${path}"`);
      console.log(`file explorer opened with path: ${path}`);

      return { status: 200 };
    });
  }

  /**
   * 다국어 번역 파일 목록
   * @param req
   */
  export function getTranslationFiles(req: GetTranslationFileReq): GetTranslationFileRes {
    return doService<GetTranslationFileRes>(() => {
      const { path } = req;

      const directories = ContentUtil.getDirectoryPathsByRootDirectoryPath(path);

      if (directories.length === 0) {
        const errorMessage: ErrorMessage = 'INVALID_LOCALE_DIRECTORY';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const files = ContentUtil.getAllTranslationFileNamesFromDirectoryPaths(directories);

      console.log('valid locale directory');
      console.log(files);

      ConfigUtil.write({ localeDirectoryPath: path });

      return { status: 200, data: { files } };
    });
  }

  /**
   * 번역 파일 생성
   * @param req
   */
  export function postTranslationFile(req: PostTranslationFileReq): PostTranslationFileRes {
    return doService<PostTranslationFileRes>(() => {
      const { path, fileName } = req;

      const directories = ContentUtil.getDirectoryPathsByRootDirectoryPath(path);

      if (!directories.length) {
        const errorMessage: ErrorMessage = 'INVALID_LOCALE_DIRECTORY';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const languages = ContentUtil.getLanguageCodesFromDirectoryPaths(directories);

      for (let i = 0; i < languages.length; i++) {
        const language = languages[i];
        const filePath = `${path}/${language}/${fileName}`;

        if (fs.existsSync(filePath)) {
          const errorMessage: ErrorMessage = 'EXIST_FILE_NAME';
          console.error(errorMessage);
          return { status: 999, errorMessage };
        }

        fs.writeFileSync(filePath, '{}');
        console.log(`file: ${filePath}`);
      }

      return { status: 200 };
    });
  }

  /**
   * 번역 파일 내용 조회
   * @param req
   */
  export function getContent(req: GetContentReq): GetContentRes {
    return doService<GetContentRes>(() => {
      const { path, fileName } = req;

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage: ErrorMessage = 'INVALID_LOCALE_DIRECTORY';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { rows, columns } = contentData;

      cache.lastReadRows = rows;

      console.log('column data', columns);
      console.log('row data', rows);

      return { status: 200, data: { columns, rows } };
    });
  }

  /**
   * 번역 파일 수정
   * @param req
   */
  export function patchContent(req: PatchContentReq): PatchContentRes {
    return doService<PatchContentRes>(() => {
      const { path, fileName, cells } = req;

      cells.forEach(({ locale, key, value }) => {
        const filePath = `${path}/${locale}/${fileName}`;
        const content = FileSystemManager.readFile(filePath);
        content[key] = value;
        FileSystemManager.writeFile(filePath, content);

        console.log(`edit: ${locale}) [${key}]: ${value}`);
      });

      return { status: 200 };
    });
  }

  /**
   * 행 추가
   * @param req
   */
  export function postContentRow(req: PostContentRowReq): PostContentRowRes {
    return doService<PostContentRowRes>(() => {
      const { path, fileName, row } = req;

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage: ErrorMessage = 'INVALID_LOCALE_DIRECTORY';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { translationFiles, rows } = contentData;

      if (!ContentUtil.compareRowKeys(rows, cache.lastReadRows)) {
        const errorMessage: ErrorMessage = 'KEYS_CHANGED_BY_EXTERNAL_WRITE';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const newRows = [...rows.slice(0, row.index), row, ...rows.slice(row.index)];
      ContentUtil.writeTranslationFilesByChangedRows(translationFiles, newRows);
      cache.lastReadRows = newRows;

      return { status: 200 };
    });
  }

  /**
   * 번역 삭제
   * @param req
   */
  export function deleteContentRow(req: DeleteContentRowReq): DeleteContentRowRes {
    return doService<DeleteContentRowRes>(() => {
      const { path, fileName, key } = req;

      const contentData = ContentUtil.getContentDataFromPathWithFileName(path, fileName);

      if (!contentData) {
        const errorMessage: ErrorMessage = 'INVALID_LOCALE_DIRECTORY';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const { translationFiles, rows } = contentData;

      if (!ContentUtil.compareRowKeys(rows, cache.lastReadRows)) {
        const errorMessage: ErrorMessage = 'KEYS_CHANGED_BY_EXTERNAL_WRITE';
        console.error(errorMessage);
        return { status: 999, errorMessage };
      }

      const newRows = rows.filter((row) => row.key !== key);
      ContentUtil.writeTranslationFilesByChangedRows(translationFiles, newRows);
      cache.lastReadRows = newRows;

      return { status: 200 };
    });
  }

  /**
   * 열 추가
   * @param req
   */
  export function postContentColumn(req: PostContentColumnReq): PostContentColumnRes {
    return doService<PostContentColumnRes>(() => {
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
    });
  }

  /**
   * 열 삭제
   * @param req
   */
  export function deleteContentColumn(req: DeleteContentColumnReq): DeleteContentColumnRes {
    return doService<DeleteContentColumnRes>(() => {
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
    });
  }

  function doService<Res extends CommonRes<any>>(callback: () => Res): Pick<Res, 'status' | 'errorMessage' | 'data'> {
    try {
      return callback();
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
