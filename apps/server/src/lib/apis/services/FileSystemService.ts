import fs from 'fs';
import {
  FileEntry,
  FileEntryType,
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemInitialPathRequest,
  GetFileSystemInitialPathResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';
import { getCurrentWorkingDirectory, openFileManager, readDirectory } from '../../utils/file';

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

const compareFileEntry = (a: FileEntry, b: FileEntry) => {
  const FILE_ENTRY_TYPE_PRIORITY: Record<FileEntryType, number> = {
    directory: 0,
    file: 1,
    unknown: 2,
  } as const;

  const priorityA = FILE_ENTRY_TYPE_PRIORITY[a.type];
  const priorityB = FILE_ENTRY_TYPE_PRIORITY[b.type];

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }

  return a.name.localeCompare(b.name);
};

const fileSystemService = {
  async getFileSystemInitialPath(_: GetFileSystemInitialPathRequest): Promise<GetFileSystemInitialPathResponse> {
    return {
      path: getCurrentWorkingDirectory(),
    };
  },

  async getFileSystemDirectory(req: GetFileSystemDirectoryRequest): Promise<GetFileSystemDirectoryResponse> {
    const { path } = req;

    const entries: FileEntry[] = (
      await readDirectory(path, {
        withFileTypes: true,
      })
    )
      .map(direntToFileEntry)
      .sort(compareFileEntry);

    return {
      path,
      entries,
    };
  },

  async postFileSystemFileManager(req: PostFileSystemFileManagerRequest): Promise<PostFileSystemFileManagerResponse> {
    const { path } = req;
    openFileManager(path);
  },
};

export default fileSystemService;
