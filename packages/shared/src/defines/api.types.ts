import {
  DirectoryReadRequest,
  DirectoryReadResponse,
  EditorReadResponse,
  EditorUpdateRequest,
  EditorUpdateResponse,
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
} from '../models';
import { ObjectPathsWithSeparator } from './path.types';

export type APICall<TResponse, TRequest = void> = (data: TRequest) => Promise<TResponse>;

export type ElectronAPIPath = ObjectPathsWithSeparator<ElectronAPI, ':'>;

export interface ElectronAPI {
  config: {
    ui: {
      read: APICall<UIReadResponse>;
      update: APICall<UIUpdateResponse, UIUpdateRequest>;
    };
    editor: {
      read: APICall<EditorReadResponse>;
      update: APICall<EditorUpdateResponse, EditorUpdateRequest>;
    };
  };

  fileSystem: {
    initialPath: {
      read: APICall<InitialPathReadResponse>;
    };
    directory: {
      read: APICall<DirectoryReadResponse, DirectoryReadRequest>;
    };
    fileManager: {
      open: APICall<FileManagerOpenResponse, FileManagerOpenRequest>;
    };
  };

  workspace: {
    getAll: APICall<WorkspaceGetAllResponse>;
    create: APICall<WorkspaceCreateResponse, WorkspaceCreateRequest>;
    update: APICall<WorkspaceUpdateResponse, WorkspaceUpdateRequest>;
    delete: APICall<WorkspaceDeleteResponse, WorkspaceDeleteRequest>;

    language: {
      getAll: APICall<LanguageGetAllResponse, LanguageGetAllRequest>;
      createMultiple: APICall<LanguageCreateMultipleResponse, LanguageCreateMultipleRequest>;
      delete: APICall<LanguageDeleteResponse, LanguageDeleteRequest>;
    };

    namespace: {
      getAll: APICall<NamespaceGetAllResponse, NamespaceGetAllRequest>;
      create: APICall<NamespaceCreateResponse, NamespaceCreateRequest>;
      delete: APICall<NamespaceDeleteResponse, NamespaceDeleteRequest>;
    };

    translation: {
      getAll: APICall<TranslationGetAllResponse, TranslationGetAllRequest>;
      create: APICall<TranslationCreateResponse, TranslationCreateRequest>;
      update: APICall<TranslationUpdateResponse, TranslationUpdateRequest>;
      delete: APICall<TranslationDeleteResponse, TranslationDeleteRequest>;
    };
  };
}
