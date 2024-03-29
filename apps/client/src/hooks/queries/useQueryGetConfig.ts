import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetConfigRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = void;

type Response = GetConfigRes;

export interface UseQueryGetConfigParams extends Omit<UseQueryParams<Response, Request>, 'req'> {}

export type UseQueryGetConfig = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetConfig(params: UseQueryGetConfigParams): UseQueryGetConfig {
  const { queryOption } = params;

  return useQuery({
    queryKey: QUERY_KEY.config.getConfig(),
    queryFn: HomeApi.getConfig,
    ...queryOption,
  });
}

export default useQueryGetConfig;
