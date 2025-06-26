import { UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '../models';
import { DirectoryReadRequest, DirectoryReadResponse } from '../models/fileSystem.directory.models';
import { FileManagerOpenRequest, FileManagerOpenResponse } from '../models/fileSystem.fileManager.models';
import { InitialPathReadResponse } from '../models/fileSystem.initialPath.models';
import { ObjectPathsWithSeparator } from './path.types';

export type APICall<TResponse, TRequest = void> = (data: TRequest) => Promise<TResponse>;

export type ElectronAPIPath = ObjectPathsWithSeparator<ElectronAPI, ':'>;

export interface ElectronAPI {
  config: {
    ui: {
      read: APICall<UIReadResponse>;
      update: APICall<UIUpdateResponse, UIUpdateRequest>;
    };
  };

  fileSystem: {
    initialPath: {
      read: APICall<InitialPathReadResponse>;
    };
    directory: {
      read: APICall<DirectoryReadResponse, DirectoryReadRequest>;
    };
    fileManager: {
      open: APICall<FileManagerOpenResponse, FileManagerOpenRequest>;
    };
  };
}
