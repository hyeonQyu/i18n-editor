import { AxiosRequestFunction } from '../../defines/api';
import BaseApi from '../../utils/BaseApi';
import {
  DeleteNamespaceLanguageRequest,
  DeleteNamespaceLanguageResponse,
  DeleteNamespaceTranslationRequest,
  DeleteNamespaceTranslationResponse,
  GetNamespaceRequest,
  GetNamespaceResponse,
  PostNamespaceLanguageRequest,
  PostNamespaceLanguageResponse,
  PostNamespaceRequest,
  PostNamespaceResponse,
  PostNamespaceTranslationRequest,
  PostNamespaceTranslationResponse,
  PutNamespaceTranslationRequest,
  PutNamespaceTranslationResponse,
} from 'i18n-editor-common';

export default class NamespaceApi extends BaseApi {
  public getNamespace: AxiosRequestFunction<GetNamespaceRequest, GetNamespaceResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/namespace'), { params: req });
  };

  public postNamespace: AxiosRequestFunction<PostNamespaceRequest, PostNamespaceResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/namespace'), req);
  };

  public postNamespaceTranslation: AxiosRequestFunction<PostNamespaceTranslationRequest, PostNamespaceTranslationResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/namespace/translation'), req);
  };

  public putNamespaceTranslation: AxiosRequestFunction<PutNamespaceTranslationRequest, PutNamespaceTranslationResponse> = (req) => {
    return this.axiosInstance.put(this.getUrl('/namespace/translation'), req);
  };

  public deleteNamespaceTranslation: AxiosRequestFunction<DeleteNamespaceTranslationRequest, DeleteNamespaceTranslationResponse> = (
    req,
  ) => {
    return this.axiosInstance.delete(this.getUrl('/namespace/translation'), { data: req });
  };

  public postNamespaceLanguage: AxiosRequestFunction<PostNamespaceLanguageRequest, PostNamespaceLanguageResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/namespace/language'), req);
  };

  public deleteNamespaceLanguage: AxiosRequestFunction<DeleteNamespaceLanguageRequest, DeleteNamespaceLanguageResponse> = (req) => {
    return this.axiosInstance.delete(this.getUrl('/namespace/language'), { data: req });
  };
}
