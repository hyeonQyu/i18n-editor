import { DirectoryReadRequest, DirectoryReadResponse, FileEntry, FileEntryType, InvalidRequestError } from '@i18n-editor/shared';
import { Dirent } from 'fs';
import { IPCHandler } from '../defines/handler.definitions';
import { readDirectory } from '../utils/file.utils';

const handleGetFileEntryType = (item: Dirent): FileEntryType => {
  if (item.isDirectory()) return 'directory';
  if (item.isFile()) return 'file';
  return 'unknown';
};

const handleDirentToFileEntry = (item: Dirent): FileEntry => {
  const type = handleGetFileEntryType(item);
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

export const readFileSystemDirectory: IPCHandler<DirectoryReadResponse, DirectoryReadRequest> = async (_, { path }) => {
  if (!path) throw new InvalidRequestError('Path is required');

  const entries: FileEntry[] = (
    await readDirectory(path, {
      withFileTypes: true,
    })
  )
    .map(handleDirentToFileEntry)
    .sort(compareFileEntry);

  return {
    path,
    entries,
  };
};
