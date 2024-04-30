import { GetConfigRequest, GetConfigResponse } from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import configService from '../services/ConfigService';

export default class ConfigController extends BaseController {
  private getConfig: ControllerMethod<never, GetConfigRequest, GetConfigResponse> = {
    path: '/',
    method: 'get',
    handler: async () => {
      return await configService.getConfig();
    },
  };
}
