import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import { GetConfigRequest, GetConfigResponse } from 'i18n-editor-common';

export default class ConfigAPI extends BaseAPI {
  public getConfig: AxiosRequestFunction<GetConfigRequest, GetConfigResponse> = () => {
    return this.axiosInstance.get(this.getUrl('/'));
  };
}
