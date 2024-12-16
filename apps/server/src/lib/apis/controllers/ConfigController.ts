import BaseController from '../../utils/BaseController';
import configService from '../services/ConfigService';

export default class ConfigController extends BaseController {
  public async start() {
    await configService.initConfig();
    super.start();
  }

  // private getConfig: ControllerMethod<never, GetConfigRequest, GetConfigResponse> = {
  //   path: '/',
  //   method: 'get',
  //   handler: async () => {},
  // };
}
