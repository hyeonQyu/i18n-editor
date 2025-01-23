import FileManagerDialog from '@components/FileManagerDialog';
import Layout from '@components/Layout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LastWorkedWorkspaceProvider from '@providers/LastWorkedWorkspaceProvider';
import ReactQueryClientProvider from '@providers/ReactQueryClientProvider';
import ThemeProvider from '@providers/ThemeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
        <ReactQueryClientProvider>
          <ThemeProvider>
            <LastWorkedWorkspaceProvider>
              <Layout>
                <Component {...pageProps} />
                <FileManagerDialog />
              </Layout>
            </LastWorkedWorkspaceProvider>
            <ReactQueryDevtools />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </APIProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
