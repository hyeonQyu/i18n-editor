import { APICall, ElectronAPI, ElectronAPIPath } from '@i18n-editor/shared';
import { contextBridge, ipcRenderer } from 'electron';

const getAPIWithPath = <TResponse, TRequest = void>(path: ElectronAPIPath): APICall<TResponse, TRequest> => {
  return (data: TRequest) => ipcRenderer.invoke(path, data);
};

const electronAPI: ElectronAPI = {
  config: {
    ui: {
      read: getAPIWithPath<{}>('config:ui:read'),
      update: getAPIWithPath<{}>('config:ui:update'),
    },
  },

  saveFile: getAPIWithPath<{ success: boolean; filePath?: string }, string>('saveFile'),
  openFile: getAPIWithPath<Electron.OpenDialogReturnValue>('openFile'),
  getVersion: getAPIWithPath<string>('getVersion'),
  readFile: getAPIWithPath<{ success: boolean; data?: string; error?: string }, string>('readFile'),
  writeFile: getAPIWithPath<{ success: boolean; error?: string }, { filePath: string; data: string }>('writeFile'),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
