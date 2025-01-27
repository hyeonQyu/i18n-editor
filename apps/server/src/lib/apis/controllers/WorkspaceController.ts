import {
  DeleteTranslationParams,
  DeleteTranslationResponse,
  DeleteWorkspaceParams,
  DeleteWorkspaceResponse,
  GetLanguagesParams,
  GetLanguagesResponse,
  GetNamespacesParams,
  GetNamespacesResponse,
  GetTranslationsParams,
  GetTranslationsResponse,
  GetWorkspacesRequest,
  GetWorkspacesResponse,
  PostLanguagesParams,
  PostLanguagesRequest,
  PostLanguagesResponse,
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
import languageService from '../services/LanguageService';
import namespaceService from '../services/NamespaceService';
import translationService from '../services/TranslationService';
import workspaceService from '../services/WorkspaceService';

export default class WorkspaceController extends BaseController {
  private getWorkspaces: ControllerMethod<never, never, GetWorkspacesRequest, GetWorkspacesResponse> = {
    path: '/',
    method: 'get',
    handler: async () => {
      const workspaces = workspaceService.getList();
      return { workspaces };
    },
  };

  private postWorkspace: ControllerMethod<PostWorkspaceRequest, never, never, PostWorkspaceResponse> = {
    path: '/',
    method: 'post',
    handler: async (req) => {
      return await workspaceService.create(req.body);
    },
  };

  private putWorkspace: ControllerMethod<PutWorkspaceRequest, PutWorkspaceParams, never, PutWorkspaceResponse> = {
    path: '/:id',
    method: 'put',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.update(id, req.body);
    },
  };

  private deleteWorkspace: ControllerMethod<never, DeleteWorkspaceParams, never, DeleteWorkspaceResponse> = {
    path: '/:id',
    method: 'delete',
    handler: async (req) => {
      const { id } = req.params;
      return await workspaceService.delete(id);
    },
  };

  private getLanguages: ControllerMethod<never, GetLanguagesParams, never, GetLanguagesResponse> = {
    path: '/:id/language',
    method: 'get',
    handler: async (req) => {
      const { id } = req.params;
      const languageCodes = await languageService.getList(id);
      return { languageCodes };
    },
  };

  private postLanguages: ControllerMethod<PostLanguagesRequest, PostLanguagesParams, never, PostLanguagesResponse> = {
    path: '/:id/language',
    method: 'post',
    handler: async (req) => {
      const { id } = req.params;
      const { languageCodes } = req.body;
      await languageService.create(id, languageCodes);
    },
  };

  private getNamespaces: ControllerMethod<never, GetNamespacesParams, never, GetNamespacesResponse> = {
    path: '/:id/namespace',
    method: 'get',
    handler: async (req) => {
      const { id } = req.params;
      const namespaces = await namespaceService.getList(id);
      return { namespaces };
    },
  };

  private postNamespace: ControllerMethod<PostNamespaceRequest, PostNamespaceParams, never, PostNamespaceResponse> = {
    path: '/:id/namespace',
    method: 'post',
    handler: async (req) => {
      const { id } = req.params;
      const { namespace } = req.body;
      await namespaceService.create(id, namespace);
    },
  };

  private getTranslations: ControllerMethod<never, GetTranslationsParams, never, GetTranslationsResponse> = {
    path: '/:id/namespace/:namespace/translation',
    method: 'get',
    handler: async (req) => {
      const { id, namespace } = req.params;
      const translations = await translationService.getList(id, namespace);
      return { translations };
    },
  };

  private postTranslation: ControllerMethod<PostTranslationRequest, PostTranslationParams, never, PostTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation',
    method: 'post',
    handler: async (req) => {
      const { id, namespace } = req.params;
      const { translation, index } = req.body;
      await translationService.create(id, namespace, { index, translation });
    },
  };

  private putTranslation: ControllerMethod<PutTranslationRequest, PutTranslationParams, never, PutTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation/:translationKey',
    method: 'put',
    handler: async (req) => {
      const { id, namespace, translationKey } = req.params;
      const { languageCode, value } = req.body;
      await translationService.update(id, namespace, translationKey, { languageCode, value });
    },
  };

  private deleteTranslation: ControllerMethod<never, DeleteTranslationParams, never, DeleteTranslationResponse> = {
    path: '/:id/namespace/:namespace/translation/:translationKey',
    method: 'delete',
    handler: async (req) => {
      const { id, namespace, translationKey } = req.params;
      await translationService.delete(id, namespace, translationKey);
    },
  };
}
