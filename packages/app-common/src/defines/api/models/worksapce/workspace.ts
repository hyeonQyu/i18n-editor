import { EditorConfig } from '../../../config';
import { Workspace } from '../../../workspace';

export type GetWorkspacesRequest = void;

export interface GetWorkspacesResponse {
  workspaces: EditorConfig['workspaces'];
}

export type PostWorkspaceRequest = Pick<Workspace, 'name' | 'path'>;

export type PostWorkspaceResponse = void;

export interface PutWorkspaceRequest {
  name: string;
}

export interface PutWorkspaceParams {
  path: string;
}

export type PutWorkspaceResponse = void;

export interface GetWorkspaceRequest {
  path: string;
}

export interface GetWorkspaceResponse {
  namespaces: string[];
}
