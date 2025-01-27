import { WorkspaceParams } from './workspace';

export type GetNamespacesParams = WorkspaceParams;

export type GetNamespacesResponse = {
  namespaces: string[];
};

export interface NamespaceParams {
  id: string;
  namespace: string;
}

export type PostNamespaceParams = Pick<NamespaceParams, 'id'>;

export type PostNamespaceRequest = Pick<NamespaceParams, 'namespace'>;

export type PostNamespaceResponse = void;
