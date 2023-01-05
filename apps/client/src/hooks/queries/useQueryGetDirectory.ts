import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { DirectoryReq, DirectoryRes } from 'i18n-editor-common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseQueryGetDirectoryParams extends UseQueryParams<DirectoryRes, DirectoryReq> {}

export type IUseQueryGetDirectory = UseQueryResult<DirectoryRes, AxiosError<DirectoryRes>>;

function useQueryGetDirectory(params: IUseQueryGetDirectoryParams): IUseQueryGetDirectory {
  const { req, queryOption = {} } = params;

  return useQuery<DirectoryRes, AxiosError<DirectoryRes>>({
    ...queryOption,
    queryKey: QUERY_KEY.directory.getDirectory(req.path ?? ''),
    queryFn: () => HomeApi.getDirectory(req),
  });
}

export default useQueryGetDirectory;
