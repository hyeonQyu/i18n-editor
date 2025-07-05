import { DirectoryReadRequest, LanguageGetAllRequest, NamespaceGetAllRequest, TranslationGetAllRequest } from '@i18n-editor/shared';

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

  workspace: {
    base: () => ['workspace'] as const,
    getAll: () => [...QUERY_KEY.workspace.base(), 'getAll'] as const,

    language: {
      base: () => [...QUERY_KEY.workspace.base(), 'language'] as const,
      getAll: (request: LanguageGetAllRequest) => [...QUERY_KEY.workspace.language.base(), 'getAll', request] as const,
    },

    namespace: {
      base: () => [...QUERY_KEY.workspace.base(), 'namespace'] as const,
      getAll: (request: NamespaceGetAllRequest) => [...QUERY_KEY.workspace.namespace.base(), 'getAll', request] as const,
    },

    translation: {
      base: () => [...QUERY_KEY.workspace.base(), 'translation'] as const,
      getAll: (request: TranslationGetAllRequest) => [...QUERY_KEY.workspace.translation.base(), 'getAll', request] as const,
    },
  },
};
