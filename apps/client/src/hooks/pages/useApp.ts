import { MutableRefObject, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { HomeApi } from '@apis/homeApi';
import { DefaultConfig, ErrorMessage } from 'i18n-editor-common';
import { QueryClient } from '@tanstack/react-query';

export interface UseApp {
  queryClient: QueryClient;
  toastRef: MutableRefObject<Toast | null>;
}

export default function useApp(): UseApp {
  const queryClient = new QueryClient();
  const toastRef = useRef<Toast>(null);

  const showError = (message: string) =>
    toastRef.current?.show({
      severity: 'error',
      life: 3000,
      detail: message,
    });

  useEffect(() => {
    const portString = document.getElementById('port')?.getAttribute('value');

    HomeApi.createAxiosInstance({
      port: portString ? Number(portString) : DefaultConfig.PORT,
      responseInterceptor: {
        onFulfilled: (response) => response,
        onRejected: (error) => {
          const { status, errorMessage } = error.response.data;

          switch (status) {
            case 999:
              switch (errorMessage as ErrorMessage) {
                case 'INVALID_LOCALE_DIRECTORY':
                  return showError('유효하지 않은 Locale 디렉토리입니다');

                case 'KEYS_CHANGED_BY_EXTERNAL_WRITE':
                  return showError('외부 쓰기에 의해 파일이 변경되었습니다\n새로고침 해주세요');
              }
              return;

            case 500:
            default:
              return showError(
                `처리 중 오류가 발생했어요\n계속 해서 같은 오류가 발생한다면\n새로고침 하거나 다시 실행해 주세요${
                  errorMessage ? `\n\nerror message: ${errorMessage}` : ''
                }`,
              );
          }
        },
      },
    });
  }, []);

  return {
    queryClient,
    toastRef,
  };
}
