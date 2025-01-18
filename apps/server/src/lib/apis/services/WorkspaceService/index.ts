import { generateUniqueID, Workspace } from 'i18n-editor-common';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import { BadRequestError, ConflictError, NotFoundError } from '../../../defines/errors';
import { getLanguageCodes } from '../../../utils/locale';
import configService from '../ConfigService';
import { getAllNamespaces } from './common/utils';
import { createLanguage } from './createLanguage';

const getWorkspaces = () => {
  const workspaceConfig = configService.getWorkspace();
  return Object.values(workspaceConfig);
};

const createWorkspace = async ({ name, path }: Pick<Workspace, 'name' | 'path'>) => {
  const workspaceConfig = configService.getWorkspace();

  const existingWorkspace = Object.values(workspaceConfig).find((workspace) => workspace.path === path);

  const id = existingWorkspace ? existingWorkspace.id : generateUniqueID();

  workspaceConfig[id] = {
    id,
    name,
    path,
    lastOpenedAt: createTimestamp(),
  };

  await configService.setWorkspace(workspaceConfig);
};

const updateWorkspace = async (id: string, workspace: Omit<Workspace, 'id'>) => {
  const workspaceConfig = configService.getWorkspace();

  const currentWorkspace = workspaceConfig[id];

  if (!currentWorkspace) {
    throw new NotFoundError('워크스페이스를 찾을 수 없습니다. 다시 시도해주세요.');
  }

  const hasDuplicateName = Object.values(workspaceConfig).some((current) => workspace.name === current.name && id !== current.id);

  if (hasDuplicateName) {
    throw new ConflictError('이미 존재하는 이름입니다.');
  }

  workspaceConfig[id] = {
    ...currentWorkspace,
    ...workspace,
  };

  await configService.setWorkspace(workspaceConfig);
};

const getWorkspace = async (id: string) => {
  const workspaceConfig = configService.getWorkspace();
  const workspace = workspaceConfig[id];

  if (!workspace) {
    throw new NotFoundError('존재하지 않는 워크스페이스입니다.');
  }

  const { path } = workspace;

  const languageCodes = await getLanguageCodes(path);

  if (languageCodes.length === 0) {
    throw new BadRequestError('올바른 workspace가 아닙니다.');
  }

  updateWorkspace(id, { ...workspace, lastOpenedAt: createTimestamp() });

  return await getAllNamespaces(path, languageCodes);
};

const deleteWorkspace = async (id: string) => {
  const workspaceConfig = configService.getWorkspace();
  delete workspaceConfig[id];
  await configService.setWorkspace(workspaceConfig);
};

const workspaceService = {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  getWorkspace,
  deleteWorkspace,
  createLanguage,
};

export default workspaceService;
