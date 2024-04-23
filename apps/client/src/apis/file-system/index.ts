import { AxiosRequestFunction } from '@defines/api';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemFileManagerRequest,
  GetFileSystemFileManagerResponse,
  GetFileSystemLocaleRequest,
  GetFileSystemLocaleResponse,
} from 'i18n-editor-common';
import BaseApi from '@utils/BaseApi';

export default class FileSystemApi extends BaseApi {
  public getFileSystemDirectory: AxiosRequestFunction<GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/directory'), { params: req });
  };

  public getFileSystemFileManager: AxiosRequestFunction<GetFileSystemFileManagerRequest, GetFileSystemFileManagerResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/file-manager'), { params: req });
  };

  public getFileSystemLocale: AxiosRequestFunction<GetFileSystemLocaleRequest, GetFileSystemLocaleResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/locale'), { params: req });
  };
}
