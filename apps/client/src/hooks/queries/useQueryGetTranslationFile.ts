import { QUERY_KEY, UseQueryParams } from '@defines/reactQuery';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetTranslationFileReq, GetTranslationFileRes } from 'i18n-editor-common';
import { useToastContext } from '@contexts/toastContext';
import { HomeApi } from '@apis/homeApi';

type Request = GetTranslationFileReq;

type Response = GetTranslationFileRes;

export interface UseQueryGetTranslationFileParams extends UseQueryParams<Response, Request> {}

export type UseQueryGetTranslationFile = UseQueryResult<Response, AxiosError<Response>>;

function useQueryGetTranslationFile(params: UseQueryGetTranslationFileParams): UseQueryGetTranslationFile {
  const { req, queryOption } = params;
  const { toastRef } = useToastContext();

  return useQuery({
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
            detail: `번역 파일 조회 중 오류가 발생했어요\n계속해서 같은 오류가 발생한다면 새로고침 해주세요${
              errorMessage ? `\n\nerror message: ${errorMessage}` : ''
            }`,
            life: 3000,
          });
          break;
      }
    },
    ...queryOption,
  });
}

export default useQueryGetTranslationFile;
