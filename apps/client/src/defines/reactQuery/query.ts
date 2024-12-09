import { GetFileSystemDirectoryRequest } from 'i18n-editor-common';

export const QUERY_KEY = {
  config: {
    base: ['config'] as const,
    getConfig: () => [...QUERY_KEY.config.base, 'getConfig'] as const,
  },

  fileSystem: {
    base: ['fileSystem'] as const,
    getDirectory: (req: GetFileSystemDirectoryRequest) => [...QUERY_KEY.fileSystem.base, 'getDirectory', req] as const,
  },
};
