import {
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostWorkspaceRequest,
  PostWorkspaceResponse,
  PutWorkspaceParams,
  PutWorkspaceRequest,
  PutWorkspaceResponse,
} from 'i18n-editor-common/lib/defines/api/models/worksapce';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import workspaceService from '../services/WorkspaceService';

export default class WorkspaceController extends BaseController {
  private getWorkspaces: ControllerMethod<never, GetWorkspacesRequest, GetWorkspacesResponse> = {
    path: '/',
    method: 'get',
    handler: async () => {
      const workspaces = workspaceService.getWorkspaces();
      return { workspaces };
    },
  };

  private postWorkspace: ControllerMethod<PostWorkspaceRequest, never, PostWorkspaceResponse> = {
    path: '/',
    method: 'post',
    handler: async (req) => {
      return await workspaceService.createWorkspace(req.body);
    },
  };

  private putWorkspace: ControllerMethod<PutWorkspaceRequest, PutWorkspaceParams, PutWorkspaceResponse> = {
    path: '/:path',
    method: 'put',
    handler: async (req) => {
      const { path } = req.params;
      const { name } = req.body;
      return await workspaceService.updateWorkspace(path, name);
    },
  };

  private getWorkspace: ControllerMethod<never, GetWorkspaceRequest, GetWorkspaceResponse> = {
    path: '/:path',
    method: 'get',
    handler: async (req) => {
      const namespaces = await workspaceService.getWorkspace(req.params.path);
      return { namespaces };
    },
  };
}
