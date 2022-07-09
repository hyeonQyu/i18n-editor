import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalPortals from '@components/common/global-portals/globalPortals';
import { useEffect } from 'react';
import { HomeApi } from '@apis/homeApi';
import { Default } from '@defines/common/default';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    useEffect(() => {
        const portString = document.getElementById('port')?.getAttribute('value');
        HomeApi.setPort(portString ? Number(portString) : Default.PORT);
    }, []);

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <GlobalPortals />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
