import { GetFileSystemDirectoryRequest, GetNamespaceRequest, GetWorkspaceRequest } from 'i18n-editor-common';

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
  },

  workspace: {
    base: ['workspace'] as const,
    getWorkspaces: () => [...QUERY_KEY.workspace.base, 'getWorkspaces'] as const,
    getAnyWorkspace: () => [...QUERY_KEY.workspace.base, 'getWorkspace'] as const,
    getWorkspace: (req: GetWorkspaceRequest) => [...QUERY_KEY.workspace.getAnyWorkspace(), req] as const,
  },

  namespace: {
    base: ['namespace'] as const,
    getNamespace: (req: GetNamespaceRequest) => [...QUERY_KEY.namespace.base, 'getNamespace', req] as const,
  },
};
