import { ElectronAPI } from '@i18n-editor/shared';

export const useElectronAPI = (): ElectronAPI => {
  if (!window.electronAPI) {
    throw new Error('Electron API is not available');
  }

  return window.electronAPI;
};
