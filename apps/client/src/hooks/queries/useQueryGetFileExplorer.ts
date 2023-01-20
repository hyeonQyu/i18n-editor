import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetFileExplorerReq, GetFileExplorerRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = GetFileExplorerReq;

type Response = GetFileExplorerRes;

export interface UseQueryGetFileExplorerParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetFileExplorer = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetFileExplorer(params: UseQueryGetFileExplorerParams): UseQueryGetFileExplorer {
  const { req, queryOption } = params;

  return useQuery({
    queryKey: QUERY_KEY.fileExplorer.getFileExplorer(req.path),
    queryFn: () => HomeApi.getFileExplorer(req),
    ...queryOption,
  });
}

export default useQueryGetFileExplorer;
