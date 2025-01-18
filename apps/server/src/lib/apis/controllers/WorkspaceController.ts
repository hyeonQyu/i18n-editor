import {
  DeleteTranslationParams,
  DeleteTranslationResponse,
  DeleteWorkspaceParams,
  DeleteWorkspaceResponse,
  GetNamespaceParams,
  GetNamespaceResponse,
  GetWorkspaceParams,
  GetWorkspaceResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostLanguageCodesParams,
  PostLanguageCodesRequest,
  PostLanguageCodesResponse,
  PostNamespaceParams,
  PostNamespaceRequest,
  PostNamespaceResponse,
  PostTranslationParams,
  PostTranslationRequest,
  PostTranslationResponse,
  PostWorkspaceRequest,
  PostWorkspaceResponse,
  PutTranslationParams,
  PutTranslationRequest,
  PutTranslationResponse,
  PutWorkspaceParams,
  PutWorkspaceRequest,
  PutWorkspaceResponse,
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

  private getWorkspace: ControllerMethod<never, GetWorkspaceParams, never, GetWorkspaceResponse> = {
    path: '/:id',
    method: 'get',
    handler: async (req) => {
      const namespaces = await workspaceService.getWorkspace(req.params.id);
      return { namespaces };
    },
  };

  private deleteWorkspace: ControllerMethod<never, DeleteWorkspaceParams, never, DeleteWorkspaceResponse> = {
    path: '/:id',
    method: 'delete',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.deleteWorkspace(id);
    },
  };

  private postNamespace: ControllerMethod<PostNamespaceRequest, PostNamespaceParams, never, PostNamespaceResponse> = {
    path: '/:id/namespace',
    method: 'post',
    handler: async (req) => {
      const { id } = req.params;
      const { namespace } = req.body;
      return await namespaceService.createNamespace(id, namespace);
    },
  };

  private getNamespace: ControllerMethod<never, GetNamespaceParams, never, GetNamespaceResponse> = {
    path: '/:id/namespace/:namespace',
    method: 'get',
    handler: async (req) => {
      const { id, namespace } = req.params;
      return await namespaceService.getNamespace(id, namespace);
    },
  };

  private postTranslation: ControllerMethod<PostTranslationRequest, PostTranslationParams, never, PostTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation',
    method: 'post',
    handler: async (req) => {
      const { id, namespace } = req.params;
      const { translation, index } = req.body;
      return await namespaceService.createTranslation(
        {
          workspaceId: id,
          namespace,
        },
        {
          translation,
          index,
        },
      );
    },
  };

  private putTranslation: ControllerMethod<PutTranslationRequest, PutTranslationParams, never, PutTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation/:translationKey',
    method: 'put',
    handler: async (req) => {
      const { id, namespace, translationKey } = req.params;
      const { languageCode, value } = req.body;
      return await namespaceService.updateTranslation(
        {
          workspaceId: id,
          namespace,
          translationKey,
        },
        { languageCode, value },
      );
    },
  };

  private deleteTranslation: ControllerMethod<never, DeleteTranslationParams, never, DeleteTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation/:translationKey',
    method: 'delete',
    handler: async (req) => {
      const { id, namespace, translationKey } = req.params;
      return await namespaceService.deleteTranslation({
        workspaceId: id,
        namespace,
        translationKey,
      });
    },
  };

  private postLanguage: ControllerMethod<PostLanguageCodesRequest, PostLanguageCodesParams, never, PostLanguageCodesResponse> = {
    path: '/:id/language',
    method: 'post',
    handler: async (req) => {
      const { id } = req.params;
      const { languageCodes } = req.body;
      return await workspaceService.createLanguage({ workspaceId: id }, { languageCodes });
    },
  };
}
