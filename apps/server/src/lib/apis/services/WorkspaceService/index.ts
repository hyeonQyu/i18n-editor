import { Workspace } from 'i18n-editor-common';
import {
  checkWorkspaceNameDuplicated,
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  getWorkspaceByPath,
  updateWorkspace,
} from '../../../utils/workspace';

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
    checkWorkspaceNameDuplicated(id, workspace.name);
    return updateWorkspace(id, { ...currentWorkspace, ...workspace });
  },

  delete: async (id: string) => {
    await deleteWorkspace(id);
  },
};

export default workspaceService;
