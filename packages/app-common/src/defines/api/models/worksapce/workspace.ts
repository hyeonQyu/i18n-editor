import { EditorConfig } from '../../../config';

export type GetWorkspaceRequest = void;

export interface GetWorkspaceResponse {
  workspaces: EditorConfig['workspaces'];
}
