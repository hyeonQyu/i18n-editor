import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
