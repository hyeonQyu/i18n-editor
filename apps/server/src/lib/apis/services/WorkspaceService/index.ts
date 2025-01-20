import { Workspace } from 'i18n-editor-common/lib/defines/workspace';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import { NotFoundError } from '../../../defines/errors';
import configService from '../ConfigService';

const getWorkspaces = () => {
  const { workspaces } = configService.getConfig();
  return [...workspaces];
};

const createWorkspace = async ({ name, path }: Pick<Workspace, 'name' | 'path'>) => {
  const workspaces = getWorkspaces();

  const existingWorkspaceIndex = workspaces.findIndex((workspace) => workspace.path === path);

  if (existingWorkspaceIndex !== -1) {
    workspaces.splice(existingWorkspaceIndex, 1);
  }

  workspaces.push({ name, path, lastOpenedAt: createTimestamp() });

  await configService.setWorkspaces(workspaces);
};

const updateWorkspace = async (path: string, name: string) => {
  const workspaces = getWorkspaces();

  const existingWorkspaceIndex = workspaces.findIndex((workspace) => workspace.path === path);

  if (existingWorkspaceIndex === -1) {
    throw new NotFoundError('Workspace not found');
  }

  workspaces[existingWorkspaceIndex].name = name;
  await configService.setWorkspaces(workspaces);
};

const workspaceService = {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
};

export default workspaceService;
