import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetTranslationFileReq, GetTranslationFileRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = GetTranslationFileReq;

type Response = GetTranslationFileRes;

export interface UseQueryGetTranslationFileParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetTranslationFile = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetTranslationFile(params: UseQueryGetTranslationFileParams): UseQueryGetTranslationFile {
  const { req, queryOption } = params;

  return useQuery({
    queryKey: QUERY_KEY.translationFile.getTranslationFile(req.path),
    queryFn: () => HomeApi.getTranslationFile(req),
    ...queryOption,
  });
}

export default useQueryGetTranslationFile;
