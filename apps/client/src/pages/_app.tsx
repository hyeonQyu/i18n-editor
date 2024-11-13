// import { ToastContext } from '../deprecated/contexts/toastContext';
// import useApp from '../deprecated/hooks/pages/useApp';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  // const { queryClient, toastRef } = useApp();

  return (
    <RecoilRoot>
      {/*<QueryClientProvider client={queryClient}>*/}
      {/*<Portal.Provider>*/}
      {/*<ToastContext.Provider value={{ toastRef }}>*/}
      <Component {...pageProps} />
      {/*<Toast ref={toastRef} />*/}
      {/*</ToastContext.Provider>*/}
      {/*</Portal.Provider>*/}
      {/*</QueryClientProvider>*/}
    </RecoilRoot>
  );
}

export default MyApp;
