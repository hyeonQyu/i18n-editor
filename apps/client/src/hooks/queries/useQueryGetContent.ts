import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetContentReq, GetContentRes } from 'i18n-editor-common';
import { Api } from '@apis/api';

type Request = GetContentReq;

type Response = GetContentRes;

export interface UseQueryGetContentParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetContent = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetContent(params: UseQueryGetContentParams): UseQueryGetContent {
  const { req, queryOption } = params;
  const { path, fileName } = req;

  return useQuery({
    queryKey: QUERY_KEY.content.getContent(path, fileName),
    queryFn: () => Api.getContent(req),
    ...queryOption,
  });
}

export default useQueryGetContent;
