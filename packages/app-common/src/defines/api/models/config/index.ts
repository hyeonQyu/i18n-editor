import { EditorConfig } from '../../../config';

export type GetConfigRequest = void;

export interface GetConfigResponse {
  config: EditorConfig;
}
