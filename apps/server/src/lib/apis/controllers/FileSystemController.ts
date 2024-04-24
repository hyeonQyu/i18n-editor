import { HttpStatusCode } from 'axios';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemFileManagerRequest,
  GetFileSystemFileManagerResponse,
  GetFileSystemLocaleRequest,
  GetFileSystemLocaleResponse,
} from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';

export default class FileSystemController extends BaseController {
  private getFileSystemDirectory: ControllerMethod<never, GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = {
    path: '/directory',
    method: 'get',
    handler: async (req) => {
      return {
        status: HttpStatusCode.NotImplemented,
        errorMessage: 'Not implemented',
      };
    },
  };

  private getFileSystemFileManager: ControllerMethod<never, GetFileSystemFileManagerRequest, GetFileSystemFileManagerResponse> = {
    path: '/file-manager',
    method: 'get',
    handler: async (req) => {
      return {
        status: HttpStatusCode.NotImplemented,
        errorMessage: 'Not implemented',
      };
    },
  };

  private getFileSystemLocale: ControllerMethod<never, GetFileSystemLocaleRequest, GetFileSystemLocaleResponse> = {
    path: '/locale',
    method: 'get',
    handler: async (req) => {
      return {
        status: HttpStatusCode.NotImplemented,
        errorMessage: 'Not implemented',
      };
    },
  };
}
