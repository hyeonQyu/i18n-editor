import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { GetDirectoryReq, GetDirectoryRes } from 'i18n-editor-common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseQueryGetDirectoryParams extends UseQueryParams<GetDirectoryRes, GetDirectoryReq> {}

export type IUseQueryGetDirectory = UseQueryResult<GetDirectoryRes, AxiosError<GetDirectoryRes>>;

function useQueryGetDirectory(params: IUseQueryGetDirectoryParams): IUseQueryGetDirectory {
  const { req, queryOption = {} } = params;

  return useQuery({
    queryKey: QUERY_KEY.directory.getDirectory(req.path ?? ''),
    queryFn: () => HomeApi.getDirectory(req),
    ...queryOption,
  });
}

export default useQueryGetDirectory;
