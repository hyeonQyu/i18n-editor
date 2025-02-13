import {
  GetFileSystemDirectoryRequest,
  GetFileSystemDirectoryResponse,
  GetFileSystemInitialPathRequest,
  GetFileSystemInitialPathResponse,
  PostFileSystemFileManagerRequest,
  PostFileSystemFileManagerResponse,
} from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import fileSystemService from '../services/FileSystemService';

export default class FileSystemController extends BaseController {
  private getFileSystemInitialPath: ControllerMethod<never, never, GetFileSystemInitialPathRequest, GetFileSystemInitialPathResponse> = {
    path: '/initial-path',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemInitialPath(req.query);
    },
  };

  private getFileSystemDirectory: ControllerMethod<never, never, GetFileSystemDirectoryRequest, GetFileSystemDirectoryResponse> = {
    path: '/directory',
    method: 'get',
    handler: async (req) => {
      return await fileSystemService.getFileSystemDirectory(req.query);
    },
  };

  private postFileSystemFileManager: ControllerMethod<PostFileSystemFileManagerRequest, never, never, PostFileSystemFileManagerResponse> = {
    path: '/file-manager',
    method: 'post',
    handler: async (req) => {
      return await fileSystemService.postFileSystemFileManager(req.body);
    },
  };
}
