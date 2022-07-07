import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default MyApp;
