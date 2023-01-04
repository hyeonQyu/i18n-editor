import { CommonRes, DirectoryEntry, DirectoryEntryType, DirectoryReq, DirectoryRes, StringUtil } from 'i18n-editor-common';
import * as fs from 'fs';

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
}
