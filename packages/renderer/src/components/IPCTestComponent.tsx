import React, { useState } from 'react';
import './IPCTestComponent.css';

interface IPCTestComponentProps {}

const IPCTestComponent: React.FC<IPCTestComponentProps> = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState<boolean | null>(null);

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

  const clearResults = () => {
    setTestResult('');
    setSidebarOpened(null);
  };

  return (
    <div className="ipc-test-container">
      <div className="ipc-test-header">
        <h2>⚙️ UI Config 테스트</h2>
        <p>UI 설정의 읽기/쓰기 기능을 테스트합니다.</p>
      </div>

      <div className="api-status">
        <h3>📡 API 상태</h3>
        {window.electronAPI ? (
          <div className="status-success">
            <span>✅ Electron API 사용 가능</span>
            {sidebarOpened !== null && <span className="version-info">🎛️ 사이드바 상태: {sidebarOpened ? '열림 🟢' : '닫힘 🔴'}</span>}
          </div>
        ) : (
          <div className="status-error">
            <span>❌ Electron API 사용 불가 (브라우저 환경)</span>
          </div>
        )}
      </div>

      <div className="test-controls">
        <h3>🎛️ 테스트 실행</h3>
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

          <button onClick={clearResults} disabled={isLoading} className="test-btn clear">
            🗑️ 결과 지우기
          </button>
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
