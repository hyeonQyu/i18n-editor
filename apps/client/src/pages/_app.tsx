import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AxiosProvider from '@providers/AxiosProvider';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <AxiosProvider>
        <Component {...pageProps} />
      </AxiosProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
