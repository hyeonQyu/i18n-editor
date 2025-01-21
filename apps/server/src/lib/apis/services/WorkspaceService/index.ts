import { Workspace } from 'i18n-editor-common';
import { BadRequestError, ConflictError, NotFoundError } from '../../../defines/errors';
import { getLanguageCodes } from '../../../utils/language';
import { getNamespaceNames } from '../../../utils/namespace';
import {
  checkWorkspaceNameDuplicated,
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  getWorkspaceByPath,
  updateWorkspace,
} from '../../../utils/workspace';
import { createLanguage } from './createLanguage';

const workspaceService = {
  getList: () => {
    return getAllWorkspaces();
  },

  create: async ({ name, path }: Pick<Workspace, 'name' | 'path'>) => {
    const existingWorkspace = getWorkspaceByPath(path);

    if (existingWorkspace) return updateWorkspace(existingWorkspace.id, { name, path });
    return createWorkspace({ name, path });
  },

  update: async (id: string, workspace: Omit<Workspace, 'id'>) => {
    const currentWorkspace = getWorkspaceById(id);

    if (!currentWorkspace) throw new NotFoundError('워크스페이스를 찾을 수 없습니다. 다시 시도해주세요.');

    const hasDuplicateName = checkWorkspaceNameDuplicated(id, workspace.name);

    if (hasDuplicateName) throw new ConflictError('이미 존재하는 이름입니다.');

    return updateWorkspace(id, { ...currentWorkspace, ...workspace });
  },

  get: async (id: string) => {
    const workspace = getWorkspaceById(id);

    if (!workspace) throw new NotFoundError('워크스페이스를 찾을 수 없습니다. 다시 시도해주세요.');

    const { path } = workspace;

    const languageCodes = await getLanguageCodes(path);

    if (languageCodes.length === 0) throw new BadRequestError('올바른 workspace가 아닙니다.');

    await updateWorkspace(id, workspace);

    return {
      languageCodes,
      namespaces: await getNamespaceNames(path, languageCodes),
    };
  },

  delete: async (id: string) => {
    await deleteWorkspace(id);
  },

  createLanguage,
};

export default workspaceService;
