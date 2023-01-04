import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { TranslationFileReq, TranslationFileRes } from 'i18n-editor-common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseQueryGetTranslationFileParams extends UseQueryParams<TranslationFileRes, TranslationFileReq> {}

export type IUseQueryGetTranslationFile = UseQueryResult<TranslationFileRes, AxiosError>;

function useQueryGetTranslationFile(params: IUseQueryGetTranslationFileParams): IUseQueryGetTranslationFile {
  const { req, queryOption } = params;

  return useQuery<TranslationFileRes, AxiosError>({
    ...queryOption,
    queryKey: QUERY_KEY.translationFile.getTranslationFile(req.path),
    queryFn: () => HomeApi.getTranslationFile(req),
  });
}

export default useQueryGetTranslationFile;
