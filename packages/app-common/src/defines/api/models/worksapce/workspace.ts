import { Workspace } from '../../../workspace';

export type GetWorkspacesRequest = void;

export interface GetWorkspacesResponse {
  workspaces: Workspace[];
}

export type PostWorkspaceRequest = Pick<Workspace, 'name' | 'path'>;

export type PostWorkspaceResponse = void;

export type PutWorkspaceRequest = Omit<Workspace, 'id'>;

export interface PutWorkspaceParams {
  id: string;
}

export type PutWorkspaceResponse = void;

export interface GetWorkspaceRequest {
  id: string;
}

export interface GetWorkspaceResponse {
  namespaces: string[];
}

export interface DeleteWorkspaceRequest {
  id: string;
}

export type DeleteWorkspaceResponse = void;
