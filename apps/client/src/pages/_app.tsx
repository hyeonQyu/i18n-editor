import '../styles/globals.css';
import '../styles/animations.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
import { ToastContext } from '@contexts/toastContext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Portal } from '@components/portal';
import useApp from '@hooks/pages/useApp';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { queryClient, toastRef } = useApp();

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
