import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HomeApi } from '@apis/homeApi';
import { DefaultConfig } from 'app-common';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    const portString = document.getElementById('port')?.getAttribute('value');
    HomeApi.setPort(portString ? Number(portString) : DefaultConfig.PORT);
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
