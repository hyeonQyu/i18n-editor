import { APICall, ElectronAPI, ElectronAPIPath, UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '@i18n-editor/shared';
import { contextBridge, ipcRenderer } from 'electron';

const getAPIWithPath = <TResponse, TRequest = void>(path: ElectronAPIPath): APICall<TResponse, TRequest> => {
  return (data: TRequest) => ipcRenderer.invoke(path, data);
};

const electronAPI: ElectronAPI = {
  config: {
    ui: {
      read: getAPIWithPath<UIReadResponse>('config:ui:read'),
      update: getAPIWithPath<UIUpdateResponse, UIUpdateRequest>('config:ui:update'),
    },
  },

  saveFile: getAPIWithPath<{ success: boolean; filePath?: string }, string>('saveFile'),
  openFile: getAPIWithPath<Electron.OpenDialogReturnValue>('openFile'),
  getVersion: getAPIWithPath<string>('getVersion'),
  readFile: getAPIWithPath<{ success: boolean; data?: string; error?: string }, string>('readFile'),
  writeFile: getAPIWithPath<{ success: boolean; error?: string }, { filePath: string; data: string }>('writeFile'),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
