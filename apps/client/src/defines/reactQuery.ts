import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface UseQueryParams<Res, Req = undefined> {
  req: Req;
  queryOption?: UseQueryOptions<Res, AxiosError<Res>>;
}

export interface UseMutationParams<Res, Req> {
  mutationOption?: UseMutationOptions<Res, AxiosError<Res>, Req>;
}

export const QUERY_KEY = {
  config: {
    base: ['config'] as const,
    getConfig: () => [...QUERY_KEY.config.base],
  },
  fileSystem: {
    base: ['fileSystem'] as const,
    getDirectory: (req: object) => [...QUERY_KEY.fileSystem.base, 'getDirectory', req],
    getLocale: (req: object) => [...QUERY_KEY.fileSystem.base, 'getLocale', req],
  },
  namespace: {
    base: ['namespace'] as const,
    getNamespace: (req: object) => [...QUERY_KEY.namespace.base, 'get', 'namespace', req],
  },
};

/**
 * @deprecated
 */
export const OLD_QUERY_KEY = {
  config: {
    base: ['config'] as const,
    getConfig: () => [...OLD_QUERY_KEY.config.base, 'get', 'config'],
  },
  directory: {
    base: ['directory'] as const,
    getDirectory: (path: string) => [...OLD_QUERY_KEY.directory.base, 'get', 'directory', path],
  },
  fileExplorer: {
    base: ['fileExplorer'] as const,
    getFileExplorer: (path: string) => [...OLD_QUERY_KEY.fileExplorer.base, 'get', 'fileExplorer', path],
  },
  translationFile: {
    base: ['translationFile'] as const,
    getTranslationFile: (path: string) => [...OLD_QUERY_KEY.translationFile.base, 'get', 'translationFile', path],
  },
  content: {
    base: ['content'] as const,
    getContent: (path: string, fileName: string) => [...OLD_QUERY_KEY.content.base, 'get', 'content', path, fileName],
  },
};

/**
 * @deprecated
 */
export const MUTATION_KEY = {
  content: {
    base: ['content'] as const,
    postDirectory: () => [...MUTATION_KEY.content.base, 'post', 'directory'],
    postTranslationFile: () => [...MUTATION_KEY.content.base, 'post', 'translation', 'file'],
    patchContent: () => [...MUTATION_KEY.content.base, 'patch', 'content'],
    postContentRow: () => [...MUTATION_KEY.content.base, 'post', 'content', 'row'],
    deleteContentRow: () => [...MUTATION_KEY.content.base, 'delete', 'content', 'row'],
    postContentColumn: () => [...MUTATION_KEY.content.base, 'post', 'content', 'column'],
    deleteContentColumn: () => [...MUTATION_KEY.content.base, 'delete', 'content', 'column'],
  },
};
