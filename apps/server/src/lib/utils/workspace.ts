import { generateUniqueID, Workspace } from 'i18n-editor-common';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import { clone } from 'lodash';
import configService from '../apis/services/ConfigService';
import { ConflictError, NotFoundError } from '../defines/errors';

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

  return id;
};

export const updateWorkspace = async (id: string, workspace: Omit<Workspace, 'id' | 'lastOpenedAt'>) => {
  const workspaceConfig = getClonedWorkspaceConfig();

  workspaceConfig[id] = {
    ...workspace,
    id,
    lastOpenedAt: createTimestamp(),
  };

  await configService.setWorkspace(workspaceConfig);

  return id;
};

export const getWorkspaceById = (id: string) => {
  const workspace = getWorkspaceConfig()[id];
  if (!workspace) throw new NotFoundError('워크스페이스를 찾을 수 없습니다. 다시 시도해주세요.');
  return workspace;
};

export const checkWorkspaceNameDuplicated = (id: string, name: string) => {
  const workspaces = getAllWorkspaces();
  const isDuplicated = workspaces.some((current) => name === current.name && id !== current.id);
  if (isDuplicated) throw new ConflictError('이미 존재하는 워크스페이스 이름입니다.');
};

export const deleteWorkspace = async (id: string) => {
  const workspaceConfig = getClonedWorkspaceConfig();
  delete workspaceConfig[id];
  await saveWorkspaceConfig(workspaceConfig);
};
