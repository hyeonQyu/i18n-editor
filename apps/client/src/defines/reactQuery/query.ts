import { GetFileSystemDirectoryRequest, GetFileSystemLocaleRequest } from 'i18n-editor-common';

export const QUERY_KEY = {
  config: {
    base: ['config'] as const,
    getConfig: () => [...QUERY_KEY.config.base, 'getConfig'] as const,
  },

  fileSystem: {
    base: ['fileSystem'] as const,
    getInitialPath: () => [...QUERY_KEY.fileSystem.base, 'getInitialPath'] as const,
    getDirectory: (req: GetFileSystemDirectoryRequest) => [...QUERY_KEY.fileSystem.base, 'getDirectory', req] as const,
    getLocaleAll: () => [...QUERY_KEY.fileSystem.base, 'getLocale'] as const,
    getLocale: (req: GetFileSystemLocaleRequest) => [...QUERY_KEY.fileSystem.getLocaleAll(), req] as const,
  },
};
