import { UseQueryOptions } from '@tanstack/react-query';

export type QueryOption<TResponse, TQueryKey extends (...args: any) => readonly unknown[]> = Omit<
  UseQueryOptions<TResponse, Error, TResponse, ReturnType<TQueryKey>>,
  'initialData' | 'queryKey' | 'queryFn'
>;
