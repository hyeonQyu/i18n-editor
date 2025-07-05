import { DirectoryReadRequest } from '@i18n-editor/shared';

export const QUERY_KEY = {
  config: {
    base: () => ['config'] as const,
    ui: {
      base: () => [...QUERY_KEY.config.base(), 'ui'] as const,
      read: () => [...QUERY_KEY.config.ui.base(), 'read'] as const,
    },
  },

  fileSystem: {
    base: () => ['fileSystem'] as const,
    initialPath: {
      base: () => [...QUERY_KEY.fileSystem.base(), 'initialPath'] as const,
      read: () => [...QUERY_KEY.fileSystem.initialPath.base(), 'read'] as const,
    },
    directory: {
      base: () => [...QUERY_KEY.fileSystem.base(), 'directory'] as const,
      read: (request: DirectoryReadRequest) => [...QUERY_KEY.fileSystem.directory.base(), 'read', request] as const,
    },
  },
};
