import { ObjectPaths } from './path.types';

export type ElectronIndividualAPI<TResponse, TRequest = void> = (data: TRequest) => Promise<TResponse>;

export type ElectronAPIPath = ObjectPaths<ElectronAPI>;

export interface ElectronAPI {
  config: {
    readUI: ElectronIndividualAPI<{}>;
    updateUI: ElectronIndividualAPI<{}>;
  };

  saveFile: ElectronIndividualAPI<{ success: boolean; filePath?: string }, string>;
  openFile: ElectronIndividualAPI<Electron.OpenDialogReturnValue>;
  getVersion: ElectronIndividualAPI<string>;
  readFile: ElectronIndividualAPI<{ success: boolean; data?: string; error?: string }, string>;
  writeFile: ElectronIndividualAPI<{ success: boolean; error?: string }, { filePath: string; data: string }>;
}
