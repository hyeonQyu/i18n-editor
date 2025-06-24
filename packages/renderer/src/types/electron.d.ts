import { ElectronAPI } from '@i18n-editor/shared';

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
