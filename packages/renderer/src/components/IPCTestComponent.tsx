import React, { useState } from 'react';
import './IPCTestComponent.css';

interface IPCTestComponentProps {}

const IPCTestComponent: React.FC<IPCTestComponentProps> = () => {
  const [version, setVersion] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState<boolean | null>(null);

  const testGetVersion = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const appVersion = await window.electronAPI.getVersion();
      setVersion(appVersion);
      setTestResult('✅ 앱 버전 가져오기 성공!');
    } catch (error) {
      setTestResult(`❌ 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testFileDialog = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const result = await window.electronAPI.openFile();
      if (result.canceled) {
        setTestResult('📁 파일 선택이 취소되었습니다');
      } else {
        setTestResult(`✅ 파일 선택 성공: ${result.filePaths[0]}`);
      }
    } catch (error) {
      setTestResult(`❌ 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWriteReadFile = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);

      // 임시 파일 저장
      const testData = JSON.stringify(
        {
          test: 'IPC 통신 테스트',
          timestamp: new Date().toISOString(),
          data: {
            message: 'Electron과 Renderer 간 통신이 정상적으로 작동합니다!',
            random: Math.random(),
          },
        },
        null,
        2,
      );

      const saveResult = await window.electronAPI.saveFile(testData);

      if (saveResult.success && saveResult.filePath) {
        // 저장된 파일 읽기
        const readResult = await window.electronAPI.readFile(saveResult.filePath);
        if (readResult.success) {
          setTestResult(
            `✅ 파일 저장/읽기 성공!\n저장 위치: ${saveResult.filePath}\n\n파일 내용 일부:\n${readResult.data?.slice(0, 100)}...`,
          );
        } else {
          setTestResult(`❌ 파일 읽기 실패: ${readResult.error}`);
        }
      } else {
        setTestResult('📁 파일 저장이 취소되었습니다');
      }
    } catch (error) {
      setTestResult(`❌ 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

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
    setVersion('');
    setSidebarOpened(null);
  };

  return (
    <div className="ipc-test-container">
      <div className="ipc-test-header">
        <h2>🧪 IPC 통신 테스트</h2>
        <p>Electron 메인 프로세스와 렌더러 프로세스 간 통신을 테스트합니다.</p>
      </div>

      <div className="api-status">
        <h3>📡 API 상태</h3>
        {window.electronAPI ? (
          <div className="status-success">
            <span>✅ Electron API 사용 가능</span>
            {version && <span className="version-info">📱 앱 버전: {version}</span>}
            {sidebarOpened !== null && <span className="version-info">🎛️ 사이드바 상태: {sidebarOpened ? '열림 🟢' : '닫힌 🔴'}</span>}
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
          <button onClick={testGetVersion} disabled={isLoading || !window.electronAPI} className="test-btn primary">
            📱 앱 버전 가져오기
          </button>

          <button onClick={testFileDialog} disabled={isLoading || !window.electronAPI} className="test-btn secondary">
            📁 파일 열기 다이얼로그
          </button>

          <button onClick={testWriteReadFile} disabled={isLoading || !window.electronAPI} className="test-btn tertiary">
            💾 파일 저장/읽기 테스트
          </button>

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
