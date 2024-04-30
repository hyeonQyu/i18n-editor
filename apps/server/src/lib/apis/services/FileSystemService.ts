import fs from 'fs';
import { GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse } from 'i18n-editor-common';
import { FileEntry, FileEntryType } from 'i18n-editor-common/lib/defines/file';
import { createService } from '../../utils/createService';

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
});

export default fileSystemService;
