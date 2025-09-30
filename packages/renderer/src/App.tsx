import { AppRouter } from '@/components/AppRouter';
import ConfirmDialog from '@/components/ConfirmDialog';
import FileManagerDialog from '@/components/FileManagerDialog';
import { LanguageCodesDialog } from '@/components/LanguageCodesDialog';
import { NamespaceAddDialog } from '@/components/NamespaceAddDialog';
import { WindowSizeSaver } from '@/components/WindowSizeSaver';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import GlobalScrollbarStyle from './components/GlobalScrollbarStyle';
import ThemeProvider from './providers/ThemeProvider';
import './styles/reset.css';
import './types/electron.d.ts';

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <GlobalScrollbarStyle />
      <ReactQueryClientProvider>
        <ThemeProvider>
          <WindowSizeSaver />
          <SnackbarProvider>
            <ConfirmDialog />
            <FileManagerDialog />
            <NamespaceAddDialog />
            <LanguageCodesDialog />

            <AppRouter />
          </SnackbarProvider>
          <ReactQueryDevtools />
        </ThemeProvider>
      </ReactQueryClientProvider>
    </HashRouter>
  );
}

export default App;
