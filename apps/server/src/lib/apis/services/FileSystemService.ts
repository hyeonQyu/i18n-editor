import childProcess from 'child_process';
import fs from 'fs';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';
import { FileEntry, FileEntryType } from 'i18n-editor-common/lib/defines/file';
import { CMD_BY_OS } from '../../defines/env';
import { createService } from '../../utils/createService';
import { getOS } from '../../utils/env';

const getFileEntryType = (item: fs.Dirent): FileEntryType => {
  if (item.isDirectory()) return 'directory';
  if (item.isFile()) return 'file';
  return 'unknown';
};

const direntToFileEntry = (item: fs.Dirent): FileEntry => {
  const type = getFileEntryType(item);
  return {
    name: item.name,
    type,
  };
};

const fileSystemService = createService({
  async getFileSystemDirectory(req: GetFileSystemDirectoryRequest): Promise<GetFileSystemDirectoryResponse> {
    const { path } = req;

    const entries: FileEntry[] = (
      await fs.promises.readdir(path, {
        withFileTypes: true,
      })
    ).map(direntToFileEntry);

    return {
      path,
      entries,
    };
  },

  async postFileSystemFileManager(req: PostFileSystemFileManagerRequest): Promise<PostFileSystemFileManagerResponse> {
    const { path } = req;

    const { openFileManager } = CMD_BY_OS[getOS()];
    childProcess.spawn(openFileManager, [path]);
  },
});

export default fileSystemService;
