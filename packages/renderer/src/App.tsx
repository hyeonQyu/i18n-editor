import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import FileManagerDialog from '@/components/FileManagerDialog/FileManagerDialog.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import NamespaceAddDialog from '@/components/NamespaceAddDialog/NamespaceAddDialog.tsx';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider/ReactQueryClientProvider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import './App.css';
import IPCTestComponent from './components/deprecated/IPCTestComponent.tsx';
import GlobalScrollbarStyle from './components/GlobalScrollbarStyle';
import ThemeProvider from './providers/ThemeProvider';
import './styles/reset.css';
import './types/electron.d.ts';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <GlobalScrollbarStyle />
      <ReactQueryClientProvider>
        <SnackbarProvider>
          <Layout>
            <ConfirmDialog />
            <FileManagerDialog />
            <NamespaceAddDialog />

            <div className="App">
              <header className="App-header">
                <h1>🌍 i18n Editor</h1>
                <p>Electron + React + TypeScript 환경이 성공적으로 구성되었습니다!</p>
                <div className="info-box">
                  <h3>현재 환경:</h3>
                  <ul>
                    <li>⚛️ React {React.version}</li>
                    <li>🔷 TypeScript</li>
                    <li>⚡ Vite (개발 서버)</li>
                    <li>🖥️ Electron (데스크톱 앱)</li>
                  </ul>
                </div>
                {window.electronAPI && (
                  <div className="electron-info">
                    <p>✅ Electron API가 정상적으로 로드되었습니다!</p>
                  </div>
                )}
              </header>

              <main className="App-main">
                <IPCTestComponent />
              </main>
            </div>
          </Layout>
        </SnackbarProvider>
        <ReactQueryDevtools />
      </ReactQueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
