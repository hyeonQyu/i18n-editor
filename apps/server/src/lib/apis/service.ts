import { DirectoryDto, DirectoryReq, DirectoryRes, StringUtil } from 'i18n-editor-common';
import * as fs from 'fs';

export namespace Service {
  /**
   * 디렉토리 내 파일 (entry) 목록
   * @param req
   */
  export function getDirectory(req: DirectoryReq): DirectoryRes {
    try {
      const path = StringUtil.getNormalizedPath(req?.path || process.cwd());
      const entries = fs.readdirSync(path);

      const data: DirectoryDto = { path, entries };

      console.log(`files from ${path}`);
      console.log(entries);

      return { status: 200, data };
    } catch (e) {
      console.error(e);
      return { status: 500, errorMessage: (e as Error).message };
    }
  }
}
