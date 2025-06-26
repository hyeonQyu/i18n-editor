import {
  APICall,
  DirectoryReadRequest,
  DirectoryReadResponse,
  ElectronAPI,
  ElectronAPIPath,
  FileManagerOpenRequest,
  FileManagerOpenResponse,
  InitialPathReadResponse,
  UIReadResponse,
  UIUpdateRequest,
  UIUpdateResponse,
} from '@i18n-editor/shared';
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
  fileSystem: {
    initialPath: {
      read: getAPIWithPath<InitialPathReadResponse>('fileSystem:initialPath:read'),
    },
    directory: {
      read: getAPIWithPath<DirectoryReadResponse, DirectoryReadRequest>('fileSystem:directory:read'),
    },
    fileManager: {
      open: getAPIWithPath<FileManagerOpenResponse, FileManagerOpenRequest>('fileSystem:fileManager:open'),
    },
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
