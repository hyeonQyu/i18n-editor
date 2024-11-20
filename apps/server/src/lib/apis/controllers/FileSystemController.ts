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
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import fileSystemService from '../services/FileSystemService';

export default class FileSystemController extends BaseController {
  private getFileSystemInitialPath: ControllerMethod<never, GetFileSystemInitialPathRequest, GetFileSystemInitialPathResponse> = {
    path: '/initial-path',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemInitialPath(req.query);
    },
  };

  private getFileSystemDirectory: ControllerMethod<never, GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = {
    path: '/directory',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemDirectory(req.query);
    },
  };

  private postFileSystemFileManager: ControllerMethod<never, PostFileSystemFileManagerRequest, PostFileSystemFileManagerResponse> = {
    path: '/file-manager',
    method: 'post',
    handler: async (req) => {
      return await fileSystemService.postFileSystemFileManager(req.body);
    },
  };

  private getFileSystemLocale: ControllerMethod<never, GetFileSystemLocaleRequest, GetFileSystemLocaleResponse> = {
    path: '/locale',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemLocale(req.query);
    },
  };
}
