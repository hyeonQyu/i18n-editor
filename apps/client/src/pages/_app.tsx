import ConfirmDialog from '@components/ConfirmDialog';
import FileManagerDialog from '@components/FileManagerDialog';
import GlobalScrollbarStyle from '@components/GlobalScrollbarStyle';
import LanguageCodesDialog from '@components/LanguageCodesDialog';
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
import '../styles/animations.css';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalScrollbarStyle />

        <SnackbarProvider>
          <APIProvider>
            <ReactQueryClientProvider>
              <Layout>
                <Component {...pageProps} />

                <ConfirmDialog />

                <FileManagerDialog />
                <NamespaceAddDialog />
                <LanguageCodesDialog />
              </Layout>
              <ReactQueryDevtools />
            </ReactQueryClientProvider>
          </APIProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
