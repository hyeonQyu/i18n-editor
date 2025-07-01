import { contextBridge, ipcRenderer } from 'electron';

// Electron API 타입 정의
export interface ElectronAPI {
  openFile: () => Promise<Electron.OpenDialogReturnValue>;
  saveFile: (data: any) => Promise<{ success: boolean; filePath?: string }>;
  getVersion: () => Promise<string>;
  readFile: (filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (filePath: string, data: string) => Promise<{ success: boolean; error?: string }>;
}

// 렌더러 프로세스에서 사용할 API를 안전하게 노출
const electronAPI: ElectronAPI = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data: any) => ipcRenderer.invoke('dialog:saveFile', data),
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  readFile: (filePath: string) => ipcRenderer.invoke('fs:readFile', filePath),
  writeFile: (filePath: string, data: string) => ipcRenderer.invoke('fs:writeFile', filePath, data),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
