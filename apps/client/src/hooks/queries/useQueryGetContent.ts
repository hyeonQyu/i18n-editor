import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { GetContentReq, GetContentRes } from 'i18n-editor-common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseQueryGetContentParams extends UseQueryParams<GetContentRes, GetContentReq> {}

export type IUseQueryGetContent = UseQueryResult<GetContentRes, AxiosError<GetContentRes>>;

function useQueryGetContent(params: IUseQueryGetContentParams): IUseQueryGetContent {
  const { req, queryOption } = params;
  const { path, fileName } = req;

  return useQuery({
    queryKey: QUERY_KEY.content.getContent(path, fileName),
    queryFn: () => HomeApi.getContent(req),
    ...queryOption,
  });
}

export default useQueryGetContent;
