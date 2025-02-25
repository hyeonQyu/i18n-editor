import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import {
  DeleteTranslationParams,
  DeleteTranslationResponse,
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  GetNamespaceParams,
  GetNamespaceResponse,
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostNamespaceParams,
  PostNamespaceRequest,
  PostNamespaceResponse,
  PostTranslationParams,
  PostTranslationRequest,
  PostTranslationResponse,
  PostWorkspaceRequest,
  PostWorkspaceResponse,
  PutTranslationParams,
  PutTranslationRequest,
  PutTranslationResponse,
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

  public deleteWorkspace: AxiosRequestFunction<DeleteWorkspaceRequest, DeleteWorkspaceResponse> = (req) => {
    const { id } = req;
    return this.axiosInstance.delete(this.getUrl(`/${id}`));
  };

  public postNamespace: AxiosRequestFunction<PostNamespaceParams & PostNamespaceRequest, PostNamespaceResponse> = (req) => {
    const { id, namespace } = req;
    return this.axiosInstance.post(this.getUrl(`/${id}`), { namespace });
  };

  public getNamespace: AxiosRequestFunction<GetNamespaceParams, GetNamespaceResponse> = (req) => {
    const { id, namespace } = req;
    return this.axiosInstance.get(this.getUrl(`/${id}/${namespace}`));
  };

  public postTranslation: AxiosRequestFunction<PostTranslationRequest & PostTranslationParams, PostTranslationResponse> = (req) => {
    const { id, namespace, index, translation } = req;
    return this.axiosInstance.post(this.getUrl(`/${id}/${namespace}`), { translation, index });
  };

  public putTranslation: AxiosRequestFunction<PutTranslationRequest & PutTranslationParams, PutTranslationResponse> = (req) => {
    const { id, namespace, translationKey, languageCode, value } = req;
    return this.axiosInstance.put(this.getUrl(`/${id}/${namespace}/${translationKey}`), { languageCode, value });
  };

  public deleteTranslation: AxiosRequestFunction<DeleteTranslationParams, DeleteTranslationResponse> = (req) => {
    const { id, namespace, translationKey } = req;
    return this.axiosInstance.delete(this.getUrl(`/${id}/${namespace}/${translationKey}`));
  };
}
