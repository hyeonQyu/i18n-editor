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
    </ThemeProvider>
  );
}

export default App;
