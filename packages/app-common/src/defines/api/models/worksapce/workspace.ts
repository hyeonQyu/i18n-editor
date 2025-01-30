import { EditorConfig } from '../../../config';
import { Workspace } from '../../../workspace';

export type GetWorkspacesRequest = void;

export interface GetWorkspacesResponse {
  workspaces: EditorConfig['workspaces'];
}

export type PostWorkspaceRequest = Pick<Workspace, 'name' | 'path'>;

export type PostWorkspaceResponse = void;

export type PutWorkspaceRequest = PostWorkspaceRequest;

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
