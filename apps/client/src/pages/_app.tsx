import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import APIProvider from 'providers/APIProvider';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <APIProvider>
        <Component {...pageProps} />
      </APIProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
