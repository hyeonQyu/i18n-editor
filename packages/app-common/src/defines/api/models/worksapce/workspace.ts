import { EditorConfig } from '../../../config';
import { Workspace } from '../../../workspace';

export type GetWorkspaceRequest = void;

export interface GetWorkspaceResponse {
  workspaces: EditorConfig['workspaces'];
}

export type PostWorkspaceRequest = Pick<Workspace, 'name' | 'path'>;

export type PostWorkspaceResponse = void;
