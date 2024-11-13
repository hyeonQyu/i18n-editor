import { Portal } from '../deprecated/components/portal';
import { ToastContext } from '../deprecated/contexts/toastContext';
import useApp from '../deprecated/hooks/pages/useApp';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import 'primeicons/primeicons.css';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Toast } from 'primereact/toast';
import { RecoilRoot } from 'recoil';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

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
