import { AxiosRequestFunction } from '@defines/api';
import BaseAPI from '@utils/BaseAPI';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';

export default class FileSystemApi extends BaseAPI {
  public getFileSystemDirectory: AxiosRequestFunction<GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = (req) => {
    return this.axiosInstance.get(this.getUrl('/directory'), { params: req });
  };

  public postFileSystemFileManager: AxiosRequestFunction<PostFileSystemFileManagerRequest, PostFileSystemFileManagerResponse> = (req) => {
    return this.axiosInstance.post(this.getUrl('/file-manager'), req);
  };
}
