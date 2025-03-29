import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import { GetUIResponse, PatchUIRequest, PatchUIResponse } from 'i18n-editor-common';

export default class ConfigAPI extends BaseAPI {
  public getUI: AxiosRequestFunction<void, GetUIResponse> = () => {
    return this.axiosInstance.get(this.getUrl('/ui'));
  };

  public patchUI: AxiosRequestFunction<PatchUIRequest, PatchUIResponse> = (req) => {
    return this.axiosInstance.patch(this.getUrl('/ui'), req);
  };
}
