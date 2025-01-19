import { Workspace } from 'i18n-editor-common/lib/defines/workspace';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import configService from '../ConfigService';

const getWorkspaces = async () => {
  const { workspaces } = configService.getConfig();
  return workspaces;
};

const createWorkspace = async ({ name, path }: Pick<Workspace, 'name' | 'path'>) => {
  const config = configService.getConfig();
  const workspaces = [...config.workspaces];

  const existingWorkspaceIndex = workspaces.findIndex((workspace) => workspace.name === name);

  if (existingWorkspaceIndex !== -1) {
    workspaces.splice(existingWorkspaceIndex, 1);
  }

  workspaces.push({ name, path, lastOpenedAt: createTimestamp() });

  await configService.setWorkspaces(workspaces);
};

const workspaceService = {
  getWorkspaces,
  createWorkspace,
};

export default workspaceService;
