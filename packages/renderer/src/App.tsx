import { AppRouter } from '@/components/AppRouter';
import ConfirmDialog from '@/components/ConfirmDialog';
import FileManagerDialog from '@/components/FileManagerDialog';
import { LanguageCodesDialog } from '@/components/LanguageCodesDialog';
import Layout from '@/components/Layout';
import { NamespaceAddDialog } from '@/components/NamespaceAddDialog';
import { WindowSizeSaver } from '@/components/WindowSizeSaver';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import './App.css';
import GlobalScrollbarStyle from './components/GlobalScrollbarStyle';
import ThemeProvider from './providers/ThemeProvider';
import './styles/reset.css';
import './types/electron.d.ts';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <GlobalScrollbarStyle />
      <ReactQueryClientProvider>
        <WindowSizeSaver />
        <SnackbarProvider>
          <Layout>
            <ConfirmDialog />
            <FileManagerDialog />
            <NamespaceAddDialog />
            <LanguageCodesDialog />

            <AppRouter />
          </Layout>
        </SnackbarProvider>
        <ReactQueryDevtools />
      </ReactQueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
