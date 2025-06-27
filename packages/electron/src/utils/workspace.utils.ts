import { Workspace } from '@i18n-editor/shared';
import { clone } from 'lodash-es';
import { configCache } from '../caches/config.cache';

export const getAllWorkspaces = () => {
  return Object.values(configCache.getConfig().workspace);
};

export const getWorkspaceByPath = (path: string) => {
  return getAllWorkspaces().find((workspace) => workspace.path === path);
};

export const getWorkspaceById = (id: string) => {
  return configCache.getConfig().workspace[id];
};

export const checkWorkspaceNameDuplicated = (id: string, name: string) => {
  return getAllWorkspaces().some((workspace) => workspace.name === name && workspace.id !== id);
};

export const updateWorkspace = async (workspace: Omit<Workspace, 'lastOpenedAt'>) => {
  const workspaceConfig = clone(configCache.getConfig().workspace);
  workspaceConfig[workspace.id] = {
    ...workspace,
    lastOpenedAt: Date.now(),
  };
  await configCache.updateWorkspace(workspaceConfig);
};

export const deleteWorkspace = async (id: string) => {
  const workspaceConfig = clone(configCache.getConfig().workspace);
  delete workspaceConfig[id];
  await configCache.updateWorkspace(workspaceConfig);
};
