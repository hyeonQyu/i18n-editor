import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { axiosInstanceCreatedState } from '@stores/store';
import { Api } from '@apis/api';
import { DefaultConfig, ErrorMessage } from 'i18n-editor-common';
import { useToastContext } from '@contexts/toastContext';

export interface ApiConfigProps {
  children: ReactNode | ReactNode[];
}

function ApiConfig(props: ApiConfigProps) {
  const { children } = props;

  const queryClient = useQueryClient();
  const { toastRef } = useToastContext();
  const setAxiosInstanceCreated = useSetRecoilState(axiosInstanceCreatedState);

  queryClient.setDefaultOptions({
    queries: {
      retry: false,
    },
  });

  const showError = (message: string) =>
    toastRef.current?.show({
      severity: 'error',
      life: 3000,
      detail: message,
    });

  useEffect(() => {
    const portString = document.getElementById('port')?.getAttribute('value');

    Api.createAxiosInstance({
      port: portString ? Number(portString) : DefaultConfig.PORT,
      responseInterceptor: {
        onFulfilled: (response) => response,
        onRejected: (error) => {
          const { status, errorMessage } = error.response.data;

          switch (status) {
            case 999:
              switch (errorMessage as ErrorMessage) {
                case 'KEYS_CHANGED_BY_EXTERNAL_WRITE':
                  showError('외부 쓰기에 의해 파일이 변경되었습니다\n새로고침 해주세요');
                  break;
              }
              break;

            case 500:
            default:
              showError(
                `처리 중 오류가 발생했어요\n계속 해서 같은 오류가 발생한다면\n새로고침 하거나 다시 실행해 주세요${
                  errorMessage ? `\n\nerror message: ${errorMessage}` : ''
                }`,
              );
              break;
          }

          throw error;
        },
      },
    });

    setAxiosInstanceCreated(true);
  }, []);

  return <>{children}</>;
}

export default ApiConfig;
