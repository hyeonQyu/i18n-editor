import { AxiosInstance } from 'axios';
import { getLeadingSlash } from 'i18n-editor-common';

abstract class BaseApi {
  private readonly _axiosInstance: AxiosInstance;
  protected get axiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  private readonly _baseUrl: string;

  public constructor(baseUrl: string, axiosInstance: AxiosInstance) {
    this._baseUrl = baseUrl;
    this._axiosInstance = axiosInstance;
  }

  protected getUrl(url: string): string {
    return `${this._baseUrl}${getLeadingSlash(url)}`;
  }
}

export default BaseApi;
