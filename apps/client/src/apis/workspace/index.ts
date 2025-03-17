import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import {
  DeleteNamespaceParams,
  DeleteNamespaceResponse,
  DeleteTranslationParams,
  DeleteTranslationResponse,
  DeleteWorkspaceParams,
  DeleteWorkspaceResponse,
  GetLanguagesParams,
  GetLanguagesResponse,
  GetNamespacesParams,
  GetNamespacesResponse,
  GetTranslationsParams,
  GetTranslationsResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostLanguagesParams,
  PostLanguagesRequest,
  PostLanguagesResponse,
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

  public deleteWorkspace: AxiosRequestFunction<DeleteWorkspaceParams, DeleteWorkspaceResponse> = (req) => {
    const { id } = req;
    return this.axiosInstance.delete(this.getUrl(`/${id}`));
  };

  public getLanguages: AxiosRequestFunction<GetLanguagesParams, GetLanguagesResponse> = (req) => {
    const { id } = req;
    return this.axiosInstance.get(this.getUrl(`/${id}/language`));
  };

  public postLanguages: AxiosRequestFunction<PostLanguagesParams & PostLanguagesRequest, PostLanguagesResponse> = (req) => {
    const { id, languageCodes } = req;
    return this.axiosInstance.post(this.getUrl(`/${id}/language`), { languageCodes });
  };

  public getNamespaces: AxiosRequestFunction<GetNamespacesParams, GetNamespacesResponse> = (req) => {
    const { id } = req;
    return this.axiosInstance.get(this.getUrl(`/${id}/namespace`));
  };

  public postNamespace: AxiosRequestFunction<PostNamespaceParams & PostNamespaceRequest, PostNamespaceResponse> = (req) => {
    const { id, namespace } = req;
    return this.axiosInstance.post(this.getUrl(`/${id}/namespace`), { namespace });
  };

  public deleteNamespace: AxiosRequestFunction<DeleteNamespaceParams, DeleteNamespaceResponse> = (req) => {
    const { id, namespace } = req;
    return this.axiosInstance.delete(this.getUrl(`/${id}/namespace/${namespace}`));
  };

  public getTranslations: AxiosRequestFunction<GetTranslationsParams, GetTranslationsResponse> = (req) => {
    const { id, namespace } = req;
    return this.axiosInstance.get(this.getUrl(`/${id}/namespace/${namespace}/translation`));
  };

  public postTranslation: AxiosRequestFunction<PostTranslationRequest & PostTranslationParams, PostTranslationResponse> = (req) => {
    const { id, namespace, index, translation } = req;
    return this.axiosInstance.post(this.getUrl(`/${id}/namespace/${namespace}/translation`), { translation, index });
  };

  public putTranslation: AxiosRequestFunction<PutTranslationRequest & PutTranslationParams, PutTranslationResponse> = (req) => {
    const { id, namespace, translationKey, languageCode, value } = req;
    return this.axiosInstance.put(this.getUrl(`/${id}/namespace/${namespace}/translation/${translationKey}`), { languageCode, value });
  };

  public deleteTranslation: AxiosRequestFunction<DeleteTranslationParams, DeleteTranslationResponse> = (req) => {
    const { id, namespace, translationKey } = req;
    return this.axiosInstance.delete(this.getUrl(`/${id}/namespace/${namespace}/translation/${translationKey}`));
  };
}
