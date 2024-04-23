import BaseApi from '@utils/BaseApi';
import { AxiosRequestFunction } from '@defines/api';
import { GetConfigRequest, GetConfigResponse } from 'i18n-editor-common';

export default class ConfigApi extends BaseApi {
  public getConfig: AxiosRequestFunction<GetConfigRequest, GetConfigResponse> = () => {
    return this.axiosInstance.get(this.getUrl('/config'));
  };
}
