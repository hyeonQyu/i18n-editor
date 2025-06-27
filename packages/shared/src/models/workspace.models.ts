import { Workspace } from '../defines';

export type WorkspaceParams = {
  workspaceId: string;
};

export type WorkspaceGetAllResponse = {
  workspaces: Workspace[];
};

export type WorkspaceCreateRequest = Pick<Workspace, 'name' | 'path'>;

export type WorkspaceCreateResponse = {
  id: string;
};

export type WorkspaceUpdateRequest = Omit<Workspace, 'lastOpenedAt'>;

export type WorkspaceUpdateResponse = void;

export type WorkspaceDeleteRequest = {
  id: string;
};

export type WorkspaceDeleteResponse = void;
