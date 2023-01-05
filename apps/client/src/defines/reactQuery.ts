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
  directory: {
    base: ['directory'] as const,
    getDirectory: (path: string) => [...QUERY_KEY.directory.base, 'get', 'directory', path],
  },
  translationFile: {
    base: ['translationFile'] as const,
    getTranslationFile: (path: string) => [...QUERY_KEY.translationFile.base, 'get', 'translationFile', path],
  },
  content: {
    base: ['content'] as const,
    getContent: (path: string, fileName: string) => [...QUERY_KEY.content.base, 'get', 'content', path, fileName],
  },
};
