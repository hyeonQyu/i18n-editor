import { HttpStatusCode } from 'axios';
import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemLocaleRequest,
  GetFileSystemLocaleResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import fileSystemService from '../services/FileSystemService';

export default class FileSystemController extends BaseController {
  private getFileSystemDirectory: ControllerMethod<never, GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = {
    path: '/directory',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemDirectory(req);
    },
  };

  private postFileSystemFileManager: ControllerMethod<never, PostFileSystemFileManagerRequest, PostFileSystemFileManagerResponse> = {
    path: '/file-manager',
    method: 'post',
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
