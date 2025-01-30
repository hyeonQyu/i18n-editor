import { GetUIResponse, PatchUIRequest, PatchUIResponse } from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import configService from '../services/ConfigService';

export default class ConfigController extends BaseController {
  public async start() {
    await configService.init();
    super.start();
  }

  private getUI: ControllerMethod<never, never, never, GetUIResponse> = {
    path: '/ui',
    method: 'get',
    handler: async () => {
      const ui = configService.getUI();
      return { ui };
    },
  };

  private patchUI: ControllerMethod<PatchUIRequest, never, never, PatchUIResponse> = {
    path: '/ui',
    method: 'patch',
    handler: async (req) => {
      await configService.updatePartialUI(req.body.ui);
    },
  };
}
