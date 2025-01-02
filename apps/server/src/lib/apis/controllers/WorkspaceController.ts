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
  type GetNamespaceRequest,
  type GetNamespaceResponse,
  type PostNamespaceRequest,
  type PostNamespaceResponse,
} from 'i18n-editor-common';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import namespaceService from '../services/NamespaceService';
import workspaceService from '../services/WorkspaceService';

export default class WorkspaceController extends BaseController {
  private getWorkspaces: ControllerMethod<never, never, GetWorkspacesRequest, GetWorkspacesResponse> = {
    path: '/',
    method: 'get',
    handler: async () => {
      const workspaces = workspaceService.getWorkspaces();
      return { workspaces };
    },
  };

  private postWorkspace: ControllerMethod<PostWorkspaceRequest, never, never, PostWorkspaceResponse> = {
    path: '/',
    method: 'post',
    handler: async (req) => {
      return await workspaceService.createWorkspace(req.body);
    },
  };

  private putWorkspace: ControllerMethod<PutWorkspaceRequest, PutWorkspaceParams, never, PutWorkspaceResponse> = {
    path: '/:id',
    method: 'put',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.updateWorkspace(id, req.body);
    },
  };

  private getWorkspace: ControllerMethod<never, GetWorkspaceRequest, never, GetWorkspaceResponse> = {
    path: '/:id',
    method: 'get',
    handler: async (req) => {
      const namespaces = await workspaceService.getWorkspace(req.params.id);
      return { namespaces };
    },
  };

  private deleteWorkspace: ControllerMethod<never, DeleteWorkspaceRequest, never, DeleteWorkspaceResponse> = {
    path: '/:id',
    method: 'delete',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.deleteWorkspace(id);
    },
  };

  private getNamespace: ControllerMethod<never, GetNamespaceRequest, never, GetNamespaceResponse> = {
    path: '/:id/:namespace',
    method: 'get',
    handler: async (req) => {
      const { id, namespace } = req.params;
      return await namespaceService.getNamespace(id, namespace);
    },
  };

  private postNamespace: ControllerMethod<never, PostNamespaceRequest, never, PostNamespaceResponse> = {
    path: '/:id/:namespace',
    method: 'post',
    handler: async (req) => {
      const { id, namespace } = req.params;
      return await namespaceService.createNamespace(id, namespace);
    },
  };
}
