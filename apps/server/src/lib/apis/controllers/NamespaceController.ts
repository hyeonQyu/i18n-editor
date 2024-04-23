import BaseController from '../../utils/BaseController';
import { ControllerMethod } from '../../defines/api';
import {
  DeleteNamespaceLanguageRequest,
  DeleteNamespaceLanguageResponse,
  DeleteNamespaceTranslationRequest,
  DeleteNamespaceTranslationResponse,
  GetNamespaceRequest,
  GetNamespaceResponse,
  PostNamespaceLanguageRequest,
  PostNamespaceLanguageResponse,
  PostNamespaceRequest,
  PostNamespaceResponse,
  PostNamespaceTranslationRequest,
  PostNamespaceTranslationResponse,
  PutNamespaceTranslationRequest,
  PutNamespaceTranslationResponse,
} from 'i18n-editor-common';
import { HttpStatusCode } from 'axios';

export default class NamespaceController extends BaseController {
  private getNamespace: ControllerMethod<never, GetNamespaceRequest, GetNamespaceResponse> = {
    path: '/',
    method: 'get',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private postNamespace: ControllerMethod<PostNamespaceRequest, never, PostNamespaceResponse> = {
    path: '/',
    method: 'post',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private postNamespaceTranslation: ControllerMethod<PostNamespaceTranslationRequest, never, PostNamespaceTranslationResponse> = {
    path: '/translation',
    method: 'post',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private putNamespaceTranslation: ControllerMethod<PutNamespaceTranslationRequest, never, PutNamespaceTranslationResponse> = {
    path: '/translation',
    method: 'put',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private deleteNamespaceTranslation: ControllerMethod<DeleteNamespaceTranslationRequest, never, DeleteNamespaceTranslationResponse> = {
    path: '/translation',
    method: 'delete',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private postNamespaceLanguage: ControllerMethod<PostNamespaceLanguageRequest, never, PostNamespaceLanguageResponse> = {
    path: '/language',
    method: 'post',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };

  private deleteNamespaceLanguage: ControllerMethod<DeleteNamespaceLanguageRequest, never, DeleteNamespaceLanguageResponse> = {
    path: '/language',
    method: 'delete',
    handler: async (req) => {
      return {
        status: HttpStatusCode.Ok,
        data: {},
      };
    },
  };
}
