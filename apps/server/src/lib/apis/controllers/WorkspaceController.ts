import {
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostWorkspaceRequest,
  PostWorkspaceResponse,
  PutWorkspaceParams,
  PutWorkspaceRequest,
  PutWorkspaceResponse,
} from 'i18n-editor-common';
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
    path: '/:id',
    method: 'put',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.updateWorkspace(id, req.body);
    },
  };

  private getWorkspace: ControllerMethod<never, GetWorkspaceRequest, GetWorkspaceResponse> = {
    path: '/:id',
    method: 'get',
    handler: async (req) => {
      const namespaces = await workspaceService.getWorkspace(req.params.id);
      return { namespaces };
    },
  };

  private deleteWorkspace: ControllerMethod<DeleteWorkspaceRequest, never, DeleteWorkspaceResponse> = {
    path: '/:id',
    method: 'delete',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.deleteWorkspace(id);
    },
  };
}
