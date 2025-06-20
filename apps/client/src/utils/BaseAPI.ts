import { AxiosInstance } from 'axios';
import { getLeadingSlash } from 'i18n-editor-common';

abstract class BaseAPI {
  private readonly _axiosInstance: AxiosInstance;
  protected get axiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  private readonly _baseUrl: string;

  public constructor(axiosInstance: AxiosInstance, baseUrl: string) {
    this._baseUrl = baseUrl;
    this._axiosInstance = axiosInstance;
  }

  protected getUrl(url: string): string {
    return `${this._baseUrl}${url ? getLeadingSlash(url) : url}`;
  }
}

export default BaseAPI;
