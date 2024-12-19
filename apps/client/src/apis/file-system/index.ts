import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemInitialPathRequest,
  GetFileSystemInitialPathResponse,
  GetFileSystemLocaleRequest,
  GetFileSystemLocaleResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';

export default class FileSystemAPI extends BaseAPI {
  public getFileSystemInitialPath: AxiosRequestFunction<GetFileSystemInitialPathRequest, GetFileSystemInitialPathResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/initial-path'), { params: req });
  };

  public getFileSystemDirectory: AxiosRequestFunction<GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/directory'), { params: req });
  };

  public postFileSystemFileManager: AxiosRequestFunction<PostFileSystemFileManagerRequest, PostFileSystemFileManagerResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/file-manager'), req);
  };

  public getFileSystemLocale: AxiosRequestFunction<GetFileSystemLocaleRequest, GetFileSystemLocaleResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/locale'), { params: req });
  };
}
