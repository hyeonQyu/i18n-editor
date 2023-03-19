import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetDirectoryReq, GetDirectoryRes } from 'i18n-editor-common';
import { Api } from '@apis/api';

type Request = GetDirectoryReq;

type Response = GetDirectoryRes;

export interface UseQueryGetDirectoryParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetDirectory = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetDirectory(params: UseQueryGetDirectoryParams): UseQueryGetDirectory {
  const { req, queryOption } = params;

  return useQuery({
    queryKey: QUERY_KEY.directory.getDirectory(req.path ?? ''),
    queryFn: () => Api.getDirectory(req),
    ...queryOption,
  });
}

export default useQueryGetDirectory;
