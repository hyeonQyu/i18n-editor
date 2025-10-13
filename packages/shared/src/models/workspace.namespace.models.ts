import { WorkspaceParams } from './workspace.models';

export type NamespaceParams = WorkspaceParams & {
  namespace: string;
};

export type NamespaceGetAllRequest = WorkspaceParams;

export type NamespaceGetAllResponse = {
  namespaces: string[];
};

export type NamespaceCreateRequest = NamespaceParams;

export type NamespaceCreateResponse = void;

export type NamespaceDeleteRequest = NamespaceParams;

export type NamespaceDeleteResponse = void;
