import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import {
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostWorkspaceRequest,
  PostWorkspaceResponse,
  PutWorkspaceParams,
  PutWorkspaceRequest,
  PutWorkspaceResponse,
} from 'i18n-editor-common';

export default class WorkspaceAPI extends BaseAPI {
  public getWorkspaces: AxiosRequestFunction<GetWorkspacesRequest, GetWorkspacesResponse> = () => {
    return this.axiosInstance.get(this.getUrl('/'));
  };

  public postWorkspace: AxiosRequestFunction<PostWorkspaceRequest, PostWorkspaceResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/'), req);
  };

  public putWorkspace: AxiosRequestFunction<PutWorkspaceRequest & PutWorkspaceParams, PutWorkspaceResponse> = (req) => {
    const { id, name, path } = req;
    return this.axiosInstance.put(this.getUrl(`/${id}`), { name, path });
  };

  public getWorkspace: AxiosRequestFunction<GetWorkspaceRequest, GetWorkspaceResponse> = (req) => {
    const { id } = req;
    return this.axiosInstance.get(this.getUrl(`/${id}`));
  };
}
