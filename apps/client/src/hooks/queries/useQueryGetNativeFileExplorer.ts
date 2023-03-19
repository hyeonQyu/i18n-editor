import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetNativeFileExplorerReq, GetNativeFileExplorerRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = GetNativeFileExplorerReq;

type Response = GetNativeFileExplorerRes;

export interface UseQueryGetNativeFileExplorerParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetNativeFileExplorer = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetNativeFileExplorer(params: UseQueryGetNativeFileExplorerParams): UseQueryGetNativeFileExplorer {
  const { req, queryOption } = params;

  return useQuery({
    queryKey: QUERY_KEY.native.getNativeFileExplorer(req.path),
    queryFn: () => HomeApi.getNativeFileExplorer(req),
    ...queryOption,
  });
}

export default useQueryGetNativeFileExplorer;
