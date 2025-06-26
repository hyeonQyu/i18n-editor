import React, { useState } from 'react';
import './IPCTestComponent.css';

interface IPCTestComponentProps {}

const IPCTestComponent: React.FC<IPCTestComponentProps> = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState<boolean | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [directoryFiles, setDirectoryFiles] = useState<string[]>([]);

  const testUIConfigRead = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.config.ui.read();
      setSidebarOpened(response.sidebarOpened);
      setTestResult(`✅ UI 설정 읽기 성공!\n사이드바 열림 상태: ${response.sidebarOpened ? '열림' : '닫힘'}`);
    } catch (error) {
      setTestResult(`❌ UI 설정 읽기 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testUIConfigUpdate = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    if (sidebarOpened === null) {
      setTestResult('⚠️ 먼저 UI 설정을 읽어주세요');
      return;
    }

    try {
      setIsLoading(true);
      const newSidebarState = !sidebarOpened;

      await window.electronAPI.config.ui.update({ sidebarOpened: newSidebarState });

      setSidebarOpened(newSidebarState);
      setTestResult(`✅ UI 설정 업데이트 성공!\n사이드바 상태를 ${newSidebarState ? '열림' : '닫힘'}으로 변경했습니다.`);
    } catch (error) {
      setTestResult(`❌ UI 설정 업데이트 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testInitialPathRead = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.fileSystem.initialPath.read();
      setCurrentPath(response.path);
      setTestResult(`✅ 초기 경로 읽기 성공!\n경로: ${response.path}`);
    } catch (error) {
      setTestResult(`❌ 초기 경로 읽기 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testDirectoryRead = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    if (!currentPath) {
      setTestResult('⚠️ 먼저 초기 경로를 읽어주세요');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.fileSystem.directory.read({
        path: currentPath,
      });
      const fileNames = response.entries.map((entry: any) => entry.name);
      setDirectoryFiles(fileNames);
      setTestResult(
        `✅ 디렉토리 읽기 성공!\n경로: ${currentPath}\n파일 개수: ${response.entries.length}개\n\n파일 목록:\n${fileNames.join('\n')}`,
      );
    } catch (error) {
      setTestResult(`❌ 디렉토리 읽기 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testFileManagerOpen = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    if (!currentPath) {
      setTestResult('⚠️ 먼저 초기 경로를 읽어주세요');
      return;
    }

    try {
      setIsLoading(true);
      await window.electronAPI.fileSystem.fileManager.open({ path: currentPath });
      setTestResult(`✅ 파일 매니저 열기 성공!\n경로: ${currentPath}\n\n💡 파일 매니저가 열렸습니다.`);
    } catch (error) {
      setTestResult(`❌ 파일 매니저 열기 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResult('');
    setSidebarOpened(null);
    setCurrentPath('');
    setDirectoryFiles([]);
  };

  const debugWindowAPI = () => {
    const debug = {
      hasElectronAPI: !!window.electronAPI,
      electronAPIKeys: window.electronAPI ? Object.keys(window.electronAPI) : [],
      windowKeys: Object.keys(window).filter((key) => key.includes('electron') || key.includes('API')),
      userAgent: navigator.userAgent,
      isElectron: navigator.userAgent.includes('Electron'),
    };

    setTestResult(`🔍 디버그 정보:\n${JSON.stringify(debug, null, 2)}`);
    console.log('🔍 Debug Window API:', debug);
  };

  return (
    <div className="ipc-test-container">
      <div className="ipc-test-header">
        <h2>🧪 Electron API 테스트</h2>
        <p>UI 설정 및 파일 시스템 API를 테스트합니다.</p>
      </div>

      <div className="api-status">
        <h3>📡 API 상태</h3>
        {window.electronAPI ? (
          <div className="status-success">
            <span>✅ Electron API 사용 가능</span>
            {sidebarOpened !== null && <span className="version-info">🎛️ 사이드바 상태: {sidebarOpened ? '열림 🟢' : '닫힘 🔴'}</span>}
            {currentPath && <span className="version-info">📁 현재 경로: {currentPath}</span>}
            {directoryFiles.length > 0 && <span className="version-info">📄 파일 개수: {directoryFiles.length}개</span>}
          </div>
        ) : (
          <div className="status-error">
            <span>❌ Electron API 사용 불가</span>
          </div>
        )}
      </div>

      <div className="test-controls">
        <h3>🎛️ 테스트 실행</h3>

        <div className="test-section">
          <h4>⚙️ UI Config API</h4>
          <div className="test-buttons">
            <button onClick={testUIConfigRead} disabled={isLoading || !window.electronAPI} className="test-btn config-read">
              ⚙️ UI 설정 읽기
            </button>

            <button
              onClick={testUIConfigUpdate}
              disabled={isLoading || !window.electronAPI || sidebarOpened === null}
              className="test-btn config-update"
            >
              🔄 사이드바 상태 토글
            </button>
          </div>
        </div>

        <div className="test-section">
          <h4>📁 File System API</h4>
          <div className="test-buttons">
            <button onClick={testInitialPathRead} disabled={isLoading || !window.electronAPI} className="test-btn filesystem-init">
              🏠 초기 경로 읽기
            </button>

            <button
              onClick={testDirectoryRead}
              disabled={isLoading || !window.electronAPI || !currentPath}
              className="test-btn filesystem-dir"
            >
              📂 디렉토리 읽기
            </button>

            <button
              onClick={testFileManagerOpen}
              disabled={isLoading || !window.electronAPI || !currentPath}
              className="test-btn filesystem-open"
            >
              🗂️ 파일 매니저 열기
            </button>
          </div>
        </div>

        <div className="test-section">
          <h4>🔧 기타</h4>
          <div className="test-buttons">
            <button onClick={clearResults} disabled={isLoading} className="test-btn clear">
              🗑️ 결과 지우기
            </button>
            <button onClick={debugWindowAPI} disabled={isLoading} className="test-btn debug">
              🔍 디버그 정보
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>⏳ 처리 중...</span>
        </div>
      )}

      {testResult && (
        <div className="test-results">
          <h3>📋 테스트 결과</h3>
          <div className="result-content">
            <pre>{testResult}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPCTestComponent;
