import { UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '../models';
import { ObjectPathsWithSeparator } from './path.types';

export type APICall<TResponse, TRequest = void> = (data: TRequest) => Promise<TResponse>;

export type ElectronAPIPath = ObjectPathsWithSeparator<ElectronAPI, ':'>;

export interface OpenDialogReturnValue {
  canceled: boolean;
  filePaths: string[];
}

export interface ElectronAPI {
  config: {
    ui: {
      read: APICall<UIReadResponse>;
      update: APICall<UIUpdateResponse, UIUpdateRequest>;
    };
  };

  saveFile: APICall<{ success: boolean; filePath?: string }, string>;
  openFile: APICall<OpenDialogReturnValue>;
  getVersion: APICall<string>;
  readFile: APICall<{ success: boolean; data?: string; error?: string }, string>;
  writeFile: APICall<{ success: boolean; error?: string }, { filePath: string; data: string }>;
}
