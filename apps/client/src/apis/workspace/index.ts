import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import { GetWorkspacesRequest, GetWorkspacesResponse, PostWorkspaceRequest, PostWorkspaceResponse } from 'i18n-editor-common';

export default class WorkspaceAPI extends BaseAPI {
  public getWorkspaces: AxiosRequestFunction<GetWorkspacesRequest, GetWorkspacesResponse> = () => {
    return this.axiosInstance.get(this.getUrl('/'));
  };

  public postWorkspace: AxiosRequestFunction<PostWorkspaceRequest, PostWorkspaceResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/'), req);
  };
}
