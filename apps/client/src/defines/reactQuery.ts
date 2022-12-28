import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface UseQueryParams<T> {
  queryOption?: UseQueryOptions<T, AxiosError>;
}

export interface UseMutationParams<T, R> {
  mutationOption?: UseMutationOptions<T, AxiosError, R>;
}

export const QUERY_KEY = {
  directory: {
    base: ['directory'] as const,
    getDirectory: (path: string) => [...QUERY_KEY.directory.base, 'get', 'directory', path],
  },
};
