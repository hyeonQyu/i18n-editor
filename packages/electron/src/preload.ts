// import { findObjectPath } from '@i18n-editor/shared';
import { contextBridge } from 'electron';

type Leaf = NonNullable<unknown>;

interface ElectronAPIMetadata {
  config: {
    readUI: Leaf;
    updateUI: Leaf;
  };

  app: {
    getVersion: Leaf;
  };
}

const metadata: ElectronAPIMetadata = {
  config: {
    readUI: {},
    updateUI: {},
  },

  app: {
    getVersion: {},
  },
};

export interface ElectronAPI {
  config: {
    readUI: () => Promise<{}>;
    updateUI: (data: {}) => Promise<{}>;
  };

  openFile: () => Promise<Electron.OpenDialogReturnValue>;
  saveFile: (data: any) => Promise<{ success: boolean; filePath?: string }>;
  getVersion: () => Promise<string>;
  readFile: (filePath: string) => Promise<{ success: boolean; data?: string; error?: string }>;
  writeFile: (filePath: string, data: string) => Promise<{ success: boolean; error?: string }>;
}

// const getAPI =
//   <TResponse, TRequest = void>(api: Leaf): ((data: TRequest) => Promise<TResponse>) =>
//   (data?: TRequest) => {
//     const path = findObjectPath(metadata, api, ':');
//     if (!path) throw new Error('API not found');
//     return ipcRenderer.invoke(path, data);
//   };

const electronAPI: ElectronAPI = {
  config: {
    readUI: () => Promise.resolve({}),
    updateUI: (data: {}) => Promise.resolve({}),
  },
  openFile: () => Promise.resolve({ canceled: false, filePaths: [] }),
  saveFile: (data: any) => Promise.resolve({ success: true }),
  getVersion: () => Promise.resolve(''),
  readFile: (filePath: string) => Promise.resolve({ success: true }),
  writeFile: (filePath: string, data: string) => Promise.resolve({ success: true }),
};

// const electronAPI = {
//   config: {
//     readUI: getAPI<{}>(metadata.config.readUI),
//     updateUI: getAPI<{}>(metadata.config.updateUI),
//   },

//   openFile: () => ipcRenderer.invoke('dialog:openFile'),
//   saveFile: (data: any) => ipcRenderer.invoke('dialog:saveFile', data),
//   app: {
//     getVersion: getAPI<string>(metadata.app.getVersion),
//   },
//   readFile: (filePath: string) => ipcRenderer.invoke('fs:readFile', filePath),
//   writeFile: (filePath: string, data: string) => ipcRenderer.invoke('fs:writeFile', filePath, data),
// } as const;

// console.log('electronAPI!!!!!!!!!!!!!!!!', electronAPI);

// export type ElectronAPI = typeof electronAPI;

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
