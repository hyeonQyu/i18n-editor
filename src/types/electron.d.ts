import type { ElectronAPI } from '../../electron/preload';

// Electron API 타입 정의
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {}; 
