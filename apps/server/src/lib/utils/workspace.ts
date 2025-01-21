import { generateUniqueID, Workspace } from 'i18n-editor-common';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import { clone } from 'lodash';
import configService from '../apis/services/ConfigService';

const getWorkspaceConfig = configService.getWorkspace;

const getClonedWorkspaceConfig = () => clone(getWorkspaceConfig());

const saveWorkspaceConfig = configService.setWorkspace;

export const getAllWorkspaces = () => {
  return Object.values(getWorkspaceConfig());
};

export const getWorkspaceByPath = (workspacePath: string) => {
  return Object.values(configService.getWorkspace()).find(({ path }) => path === workspacePath);
};

export const createWorkspace = async (workspace: Pick<Workspace, 'name' | 'path'>) => {
  const workspaceConfig = getClonedWorkspaceConfig();

  const id = generateUniqueID();

  workspaceConfig[id] = {
    ...workspace,
    id,
    lastOpenedAt: createTimestamp(),
  };

  await saveWorkspaceConfig(workspaceConfig);
};

export const updateWorkspace = async (id: string, workspace: Omit<Workspace, 'id' | 'lastOpenedAt'>) => {
  const workspaceConfig = getClonedWorkspaceConfig();

  workspaceConfig[id] = {
    ...workspace,
    id,
    lastOpenedAt: createTimestamp(),
  };

  await configService.setWorkspace(workspaceConfig);
};

export const getWorkspaceById = (id: string) => {
  return getWorkspaceConfig()[id];
};

export const checkWorkspaceNameDuplicated = (id: string, name: string) => {
  const workspaces = getAllWorkspaces();
  return workspaces.some((current) => name === current.name && id !== current.id);
};

export const deleteWorkspace = async (id: string) => {
  const workspaceConfig = getClonedWorkspaceConfig();
  delete workspaceConfig[id];
  await saveWorkspaceConfig(workspaceConfig);
};
