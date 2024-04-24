import { HttpStatusCode } from 'axios';
import { GetConfigRequest, GetConfigResponse } from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';

export default class ConfigController extends BaseController {
  private getConfig: ControllerMethod<never, GetConfigRequest, GetConfigResponse> = {
    path: '/',
    method: 'get',
    handler: async (req) => {
      return {
        status: HttpStatusCode.NotImplemented,
        errorMessage: 'Not implemented',
      };
    },
  };
}
