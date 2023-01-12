import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { HomeApi } from '@apis/homeApi';
import { DefaultConfig } from 'i18n-editor-common';
import { Toast } from 'primereact/toast';
import { ToastContext } from '@contexts/toastContext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Portal } from '@components/portal';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    const portString = document.getElementById('port')?.getAttribute('value');
    HomeApi.setPort(portString ? Number(portString) : DefaultConfig.PORT);
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Portal.Provider>
          <ToastContext.Provider value={{ toastRef }}>
            <Component {...pageProps} />
            <Toast ref={toastRef} />
            <ConfirmDialog />
          </ToastContext.Provider>
        </Portal.Provider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
