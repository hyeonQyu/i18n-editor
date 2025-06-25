import { UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '../models';
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
}
