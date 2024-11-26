import childProcess from 'child_process';
import fs from 'fs';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemInitialPathRequest,
  GetFileSystemInitialPathResponse,
  GetFileSystemLocaleRequest,
  GetFileSystemLocaleResponse,
  getLeadingSlash,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';
import { FileEntry, FileEntryType } from 'i18n-editor-common/lib/defines/file';
import { CMD_BY_OS } from '../../defines/env';
import { BadRequestError } from '../../defines/errors';
import { getOS } from '../../utils/env';
import { getFileNames, readDirectory } from '../../utils/file';
import { getLanguageCodes } from '../../utils/locale';

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

const getAllNamespaces = async (rootPath: string, languages: string[]) => {
  const jsonFileNames: string[] = [];

  const jsonFileNamesList = await Promise.all(
    languages.map((language) => {
      const directoryPath = `${rootPath}/${language}`;
      return getFileNames(directoryPath, ['json']);
    }),
  );

  jsonFileNamesList.forEach((fileNames) => {
    jsonFileNames.push(...fileNames);
  });

  return Array.from(new Set(jsonFileNames));
};

const fileSystemService = {
  async getFileSystemInitialPath(_: GetFileSystemInitialPathRequest): Promise<GetFileSystemInitialPathResponse> {
    return {
      path: process.cwd(),
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

    const { openFileManager } = CMD_BY_OS[getOS()];
    childProcess.spawn(openFileManager, [getLeadingSlash(path)]);
  },

  async getFileSystemLocale(req: GetFileSystemLocaleRequest): Promise<GetFileSystemLocaleResponse> {
    const { path } = req;

    const languages = await getLanguageCodes(path);

    if (languages.length === 0) {
      throw new BadRequestError('올바른 locale 디렉토리가 아닙니다.');
    }

    const namespaces = await getAllNamespaces(path, languages);

    return {
      namespaces,
    };
  },
};

export default fileSystemService;
