import {
  generateUniqueID,
  WorkspaceCreateRequest,
  WorkspaceCreateResponse,
  WorkspaceDeleteRequest,
  WorkspaceDeleteResponse,
  WorkspaceGetAllResponse,
  WorkspaceUpdateRequest,
  WorkspaceUpdateResponse,
} from '@i18n-editor/shared';
import { clone } from 'lodash-es';
import { configCache } from '../caches/config.cache';
import { IPCHandler } from '../defines/handler.definitions';
import {
  checkWorkspaceNameDuplicated,
  deleteWorkspace,
  getAllWorkspaces,
  getWorkspaceByPath,
  updateWorkspace,
} from '../utils/workspace.utils';

export const handleGetAllWorkspaces: IPCHandler<WorkspaceGetAllResponse> = async () => {
  return {
    workspaces: getAllWorkspaces(),
  };
};

export const handleCreateWorkspace: IPCHandler<WorkspaceCreateResponse, WorkspaceCreateRequest> = async (_, { name, path }) => {
  const workspace = getWorkspaceByPath(path);

  if (workspace) {
    throw new Error('Workspace already exists');
  }

  const id = generateUniqueID();

  await updateWorkspace({ id, name, path });

  return {
    id,
  };
};

export const handleUpdateWorkspace: IPCHandler<WorkspaceUpdateResponse, WorkspaceUpdateRequest> = async (_, { id, name, path }) => {
  const workspaceConfig = clone(configCache.getConfig().workspace);
  const workspace = workspaceConfig[id];

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  if (checkWorkspaceNameDuplicated(id, name)) {
    throw new Error('Workspace name already exists');
  }

  await updateWorkspace({ ...workspace, name, path });
};

export const handleDeleteWorkspace: IPCHandler<WorkspaceDeleteResponse, WorkspaceDeleteRequest> = async (_, { id }) => {
  await deleteWorkspace(id);
};
