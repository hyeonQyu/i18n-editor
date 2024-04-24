import { Config } from '../../../config';

export type GetConfigRequest = void;

export interface GetConfigResponse {
  config: Config;
}
