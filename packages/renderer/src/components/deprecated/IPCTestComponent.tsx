import React, { useState } from 'react';
import { useElectronAPI } from '../../hooks/common';
import './IPCTestComponent.css';

interface IPCTestComponentProps {}

// 동적 API 타입 정의
declare global {
  interface Window {
    dynamicAPI?: {
      invoke: <TResponse, TRequest = void>(
        pathTemplate: string,
        pathParams: Record<string, string | number>,
        data?: TRequest,
      ) => Promise<TResponse>;
    };
  }
}

const IPCTestComponent: React.FC<IPCTestComponentProps> = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState<boolean | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [directoryFiles, setDirectoryFiles] = useState<string[]>([]);

  // Workspace 테스트용 state
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [translations, setTranslations] = useState<any[]>([]);

  const electronAPI = useElectronAPI();

  const testUIConfigRead = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await electronAPI.config.ui.read();
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

      await electronAPI.config.ui.update({ sidebarOpened: newSidebarState });

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
      const response = await electronAPI.fileSystem.initialPath.read();
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

  // Workspace API 테스트 함수들
  const testWorkspaceGetAll = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.workspace.getAll();
      setWorkspaces(response.workspaces);
      setTestResult(
        `✅ 워크스페이스 목록 조회 성공!\n개수: ${response.workspaces.length}개\n\n워크스페이스:\n${response.workspaces.map((w) => `- ${w.name} (${w.path})`).join('\n')}`,
      );
    } catch (error) {
      setTestResult(`❌ 워크스페이스 목록 조회 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWorkspaceCreate = async () => {
    if (!window.electronAPI) {
      setTestResult('❌ Electron API를 사용할 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.workspace.create({
        name: `테스트 워크스페이스 ${Date.now()}`,
        path: currentPath || '/tmp/test-workspace',
      });
      setTestResult(`✅ 워크스페이스 생성 성공!\nID: ${response.id}`);
      // 생성 후 목록 새로고침
      setTimeout(() => testWorkspaceGetAll(), 1000);
    } catch (error) {
      setTestResult(`❌ 워크스페이스 생성 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWorkspaceUpdate = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    const selectedWorkspace = workspaces.find((w) => w.id === selectedWorkspaceId);
    if (!selectedWorkspace) {
      setTestResult('❌ 선택된 워크스페이스를 찾을 수 없습니다');
      return;
    }

    try {
      setIsLoading(true);
      await window.electronAPI.workspace.update({
        ...selectedWorkspace,
        name: `${selectedWorkspace.name} (수정됨)`,
      });
      setTestResult(`✅ 워크스페이스 업데이트 성공!\nID: ${selectedWorkspaceId}`);
      // 업데이트 후 목록 새로고침
      setTimeout(() => testWorkspaceGetAll(), 1000);
    } catch (error) {
      setTestResult(`❌ 워크스페이스 업데이트 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWorkspaceDelete = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      await window.electronAPI.workspace.delete({ id: selectedWorkspaceId });
      setTestResult(`✅ 워크스페이스 삭제 성공!\nID: ${selectedWorkspaceId}`);
      setSelectedWorkspaceId('');
      // 삭제 후 목록 새로고침
      setTimeout(() => testWorkspaceGetAll(), 1000);
    } catch (error) {
      setTestResult(`❌ 워크스페이스 삭제 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLanguageGetAll = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.workspace.language.getAll({ workspaceId: selectedWorkspaceId });
      setLanguages(response.languageCodes);
      setTestResult(`✅ 언어 목록 조회 성공!\n개수: ${response.languageCodes.length}개\n\n언어:\n${response.languageCodes.join(', ')}`);
    } catch (error) {
      setTestResult(`❌ 언어 목록 조회 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testLanguageCreateMultiple = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      await window.electronAPI.workspace.language.createMultiple({
        workspaceId: selectedWorkspaceId,
        languageCodes: ['ko', 'en', 'ja'],
      });
      setTestResult(`✅ 언어 생성 성공!\n생성된 언어: ko, en, ja`);
      // 생성 후 목록 새로고침
      setTimeout(() => testLanguageGetAll(), 1000);
    } catch (error) {
      setTestResult(`❌ 언어 생성 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testNamespaceGetAll = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.workspace.namespace.getAll({ workspaceId: selectedWorkspaceId });
      setNamespaces(response.namespaces);
      setTestResult(
        `✅ 네임스페이스 목록 조회 성공!\n개수: ${response.namespaces.length}개\n\n네임스페이스:\n${response.namespaces.join(', ')}`,
      );
    } catch (error) {
      setTestResult(`❌ 네임스페이스 목록 조회 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testNamespaceCreate = async () => {
    if (!window.electronAPI || !selectedWorkspaceId) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      const namespaceName = `test-namespace-${Date.now()}`;
      await window.electronAPI.workspace.namespace.create({
        workspaceId: selectedWorkspaceId,
        namespace: namespaceName,
      });
      setTestResult(`✅ 네임스페이스 생성 성공!\n네임스페이스: ${namespaceName}`);
      // 생성 후 목록 새로고침
      setTimeout(() => testNamespaceGetAll(), 1000);
    } catch (error) {
      setTestResult(`❌ 네임스페이스 생성 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testTranslationGetAll = async () => {
    if (!window.electronAPI || !selectedWorkspaceId || namespaces.length === 0) {
      setTestResult('❌ Electron API를 사용할 수 없거나 워크스페이스/네임스페이스가 선택되지 않았습니다');
      return;
    }

    try {
      setIsLoading(true);
      const response = await window.electronAPI.workspace.translation.getAll({
        workspaceId: selectedWorkspaceId,
        namespace: namespaces[0], // 첫 번째 네임스페이스 사용
      });
      setTranslations(response.translations);
      setTestResult(
        `✅ 번역 목록 조회 성공!\n네임스페이스: ${namespaces[0]}\n개수: ${response.translations.length}개\n\n번역:\n${response.translations.map((t) => `- ${t.key}`).join('\n')}`,
      );
    } catch (error) {
      setTestResult(`❌ 번역 목록 조회 오류: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResult('');
    setSidebarOpened(null);
    setCurrentPath('');
    setDirectoryFiles([]);
    setWorkspaces([]);
    setSelectedWorkspaceId('');
    setLanguages([]);
    setNamespaces([]);
    setTranslations([]);
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
        <p>UI 설정, 파일 시스템 및 워크스페이스 API를 테스트합니다.</p>
      </div>

      <div className="api-status">
        <h3>📡 API 상태</h3>
        {window.electronAPI ? (
          <div className="status-success">
            <span>✅ Electron API 사용 가능</span>
            {sidebarOpened !== null && <span className="version-info">🎛️ 사이드바 상태: {sidebarOpened ? '열림 🟢' : '닫힘 🔴'}</span>}
            {currentPath && <span className="version-info">📁 현재 경로: {currentPath}</span>}
            {directoryFiles.length > 0 && <span className="version-info">📄 파일 개수: {directoryFiles.length}개</span>}
            {workspaces.length > 0 && <span className="version-info">🏢 워크스페이스: {workspaces.length}개</span>}
            {selectedWorkspaceId && <span className="version-info">🎯 선택된 워크스페이스: {selectedWorkspaceId}</span>}
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
          <h4>🏢 Workspace API</h4>
          <div className="workspace-controls">
            <label>
              워크스페이스 선택:
              <select
                value={selectedWorkspaceId}
                onChange={(e) => setSelectedWorkspaceId(e.target.value)}
                style={{ marginLeft: '8px', padding: '4px' }}
              >
                <option value="">워크스페이스를 선택하세요</option>
                {workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="test-buttons">
            <button onClick={testWorkspaceGetAll} disabled={isLoading || !window.electronAPI} className="test-btn workspace-list">
              📋 워크스페이스 목록
            </button>

            <button onClick={testWorkspaceCreate} disabled={isLoading || !window.electronAPI} className="test-btn workspace-create">
              ➕ 워크스페이스 생성
            </button>

            <button
              onClick={testWorkspaceUpdate}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn workspace-update"
            >
              ✏️ 워크스페이스 수정
            </button>

            <button
              onClick={testWorkspaceDelete}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn workspace-delete"
            >
              🗑️ 워크스페이스 삭제
            </button>
          </div>
        </div>

        <div className="test-section">
          <h4>🌐 Language API</h4>
          <div className="test-buttons">
            <button
              onClick={testLanguageGetAll}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn language-list"
            >
              📋 언어 목록
            </button>

            <button
              onClick={testLanguageCreateMultiple}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn language-create"
            >
              ➕ 언어 생성 (ko,en,ja)
            </button>
          </div>
        </div>

        <div className="test-section">
          <h4>📦 Namespace API</h4>
          <div className="test-buttons">
            <button
              onClick={testNamespaceGetAll}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn namespace-list"
            >
              📋 네임스페이스 목록
            </button>

            <button
              onClick={testNamespaceCreate}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId}
              className="test-btn namespace-create"
            >
              ➕ 네임스페이스 생성
            </button>
          </div>
        </div>

        <div className="test-section">
          <h4>🔤 Translation API</h4>
          <div className="test-buttons">
            <button
              onClick={testTranslationGetAll}
              disabled={isLoading || !window.electronAPI || !selectedWorkspaceId || namespaces.length === 0}
              className="test-btn translation-list"
            >
              📋 번역 목록
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
