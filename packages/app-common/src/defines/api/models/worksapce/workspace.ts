import { LanguageCode } from '../../../language';
import { Workspace } from '../../../workspace';

export interface WorkspaceParams {
  id: string;
}

export type GetWorkspacesRequest = void;

export interface GetWorkspacesResponse {
  workspaces: Workspace[];
}

export type PostWorkspaceRequest = Pick<Workspace, 'name' | 'path'>;

export type PostWorkspaceResponse = void;

export type PutWorkspaceRequest = Omit<Workspace, 'id'>;

export type PutWorkspaceParams = WorkspaceParams;

export type PutWorkspaceResponse = void;

export type GetWorkspaceParams = WorkspaceParams;

export interface GetWorkspaceResponse {
  languageCodes: LanguageCode[];
  namespaces: string[];
}

export type DeleteWorkspaceParams = WorkspaceParams;

export type DeleteWorkspaceResponse = void;
