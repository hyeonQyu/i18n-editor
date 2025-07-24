import {
  APICall,
  DirectoryReadRequest,
  DirectoryReadResponse,
  ElectronAPI,
  ElectronAPIPath,
  FileManagerOpenRequest,
  FileManagerOpenResponse,
  InitialPathReadResponse,
  LanguageCreateMultipleRequest,
  LanguageCreateMultipleResponse,
  LanguageDeleteRequest,
  LanguageDeleteResponse,
  LanguageGetAllRequest,
  LanguageGetAllResponse,
  NamespaceCreateRequest,
  NamespaceCreateResponse,
  NamespaceDeleteRequest,
  NamespaceDeleteResponse,
  NamespaceGetAllRequest,
  NamespaceGetAllResponse,
  TranslationCreateRequest,
  TranslationCreateResponse,
  TranslationDeleteRequest,
  TranslationDeleteResponse,
  TranslationGetAllRequest,
  TranslationGetAllResponse,
  TranslationUpdateRequest,
  TranslationUpdateResponse,
  UIReadResponse,
  UIUpdateRequest,
  UIUpdateResponse,
  WorkspaceCreateRequest,
  WorkspaceCreateResponse,
  WorkspaceDeleteRequest,
  WorkspaceDeleteResponse,
  WorkspaceGetAllResponse,
  WorkspaceUpdateRequest,
  WorkspaceUpdateResponse,
} from '@i18n-editor/shared';
import { contextBridge, ipcRenderer } from 'electron';

const getAPIWithPath = <TResponse, TRequest = void>(path: ElectronAPIPath): APICall<TResponse, TRequest> => {
  return (data: TRequest) => ipcRenderer.invoke(path, data);
};

const electronAPI: ElectronAPI = {
  config: {
    ui: {
      read: getAPIWithPath<UIReadResponse>('config:ui:read'),
      update: getAPIWithPath<UIUpdateResponse, UIUpdateRequest>('config:ui:update'),
    },
  },

  fileSystem: {
    initialPath: {
      read: getAPIWithPath<InitialPathReadResponse>('fileSystem:initialPath:read'),
    },
    directory: {
      read: getAPIWithPath<DirectoryReadResponse, DirectoryReadRequest>('fileSystem:directory:read'),
    },
    fileManager: {
      open: getAPIWithPath<FileManagerOpenResponse, FileManagerOpenRequest>('fileSystem:fileManager:open'),
    },
  },

  workspace: {
    getAll: getAPIWithPath<WorkspaceGetAllResponse>('workspace:getAll'),
    create: getAPIWithPath<WorkspaceCreateResponse, WorkspaceCreateRequest>('workspace:create'),
    update: getAPIWithPath<WorkspaceUpdateResponse, WorkspaceUpdateRequest>('workspace:update'),
    delete: getAPIWithPath<WorkspaceDeleteResponse, WorkspaceDeleteRequest>('workspace:delete'),

    language: {
      getAll: getAPIWithPath<LanguageGetAllResponse, LanguageGetAllRequest>('workspace:language:getAll'),
      createMultiple: getAPIWithPath<LanguageCreateMultipleResponse, LanguageCreateMultipleRequest>('workspace:language:createMultiple'),
      delete: getAPIWithPath<LanguageDeleteResponse, LanguageDeleteRequest>('workspace:language:delete'),
    },

    namespace: {
      getAll: getAPIWithPath<NamespaceGetAllResponse, NamespaceGetAllRequest>('workspace:namespace:getAll'),
      create: getAPIWithPath<NamespaceCreateResponse, NamespaceCreateRequest>('workspace:namespace:create'),
      delete: getAPIWithPath<NamespaceDeleteResponse, NamespaceDeleteRequest>('workspace:namespace:delete'),
    },

    translation: {
      getAll: getAPIWithPath<TranslationGetAllResponse, TranslationGetAllRequest>('workspace:translation:getAll'),
      create: getAPIWithPath<TranslationCreateResponse, TranslationCreateRequest>('workspace:translation:create'),
      update: getAPIWithPath<TranslationUpdateResponse, TranslationUpdateRequest>('workspace:translation:update'),
      delete: getAPIWithPath<TranslationDeleteResponse, TranslationDeleteRequest>('workspace:translation:delete'),
    },
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
