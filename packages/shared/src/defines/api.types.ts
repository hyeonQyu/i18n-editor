import { ObjectPaths } from './path.types';

export type APICall<TResponse, TRequest = void> = (data: TRequest) => Promise<TResponse>;

export type ElectronAPIPath = ObjectPaths<ElectronAPI>;

export interface ElectronAPI {
  config: {
    readUI: APICall<{}>;
    updateUI: APICall<{}>;
  };

  saveFile: APICall<{ success: boolean; filePath?: string }, string>;
  openFile: APICall<Electron.OpenDialogReturnValue>;
  getVersion: APICall<string>;
  readFile: APICall<{ success: boolean; data?: string; error?: string }, string>;
  writeFile: APICall<{ success: boolean; error?: string }, { filePath: string; data: string }>;
}
