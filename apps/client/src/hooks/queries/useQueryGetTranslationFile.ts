import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { TranslationFileReq, TranslationFileRes } from 'i18n-editor-common';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';
import { useToastContext } from '@contexts/toastContext';

export interface IUseQueryGetTranslationFileParams extends UseQueryParams<TranslationFileRes, TranslationFileReq> {}

export type IUseQueryGetTranslationFile = UseQueryResult<TranslationFileRes, AxiosError<TranslationFileRes>>;

function useQueryGetTranslationFile(params: IUseQueryGetTranslationFileParams): IUseQueryGetTranslationFile {
  const { req, queryOption } = params;

  const { toastRef } = useToastContext();

  return useQuery<TranslationFileRes, AxiosError<TranslationFileRes>>({
    ...queryOption,
    queryKey: QUERY_KEY.translationFile.getTranslationFile(req.path),
    queryFn: () => HomeApi.getTranslationFile(req),
    onError(error) {
      const data = error?.response?.data;
      const status = data?.status;
      const errorMessage = data?.errorMessage;

      switch (status) {
        case 999:
          toastRef.current?.show({
            severity: 'error',
            detail: '유효하지 않은 Locale 디렉토리입니다',
            life: 3000,
          });
          break;

        case 500:
        default:
          toastRef.current?.show({
            severity: 'error',
            detail: `처리 중 오류가 발생했어요${errorMessage ? `\nerror message: ${errorMessage}` : ''}`,
            life: 3000,
          });
          break;
      }
    },
  });
}

export default useQueryGetTranslationFile;
