import FileManagerDialog from '@components/FileManagerDialog';
import Layout from '@components/Layout';
import NamespaceAddDialog from '@components/NamespaceAddDialog';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactQueryClientProvider from '@providers/ReactQueryClientProvider';
import ThemeProvider from '@providers/ThemeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import APIProvider from 'providers/APIProvider';
import WorkspaceProvider from 'providers/WorkspaceProvider';
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <APIProvider>
          <ReactQueryClientProvider>
            <WorkspaceProvider>
              <Layout>
                <Component {...pageProps} />

                <FileManagerDialog />
                <NamespaceAddDialog />
              </Layout>
            </WorkspaceProvider>
            <ReactQueryDevtools />
          </ReactQueryClientProvider>
        </APIProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
