import { getLanguageCodes } from '../../../utils/language';
import { checkNamespaceDuplicated, createNamespace, deleteNamespace, getNamespaceNames } from '../../../utils/namespace';
import { getWorkspaceById, updateWorkspaceLastOpenedAt } from '../../../utils/workspace';

const namespaceService = {
  getList: async (workspaceId: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);

    const result = await getNamespaceNames(workspace.path, languageCodes);
    await updateWorkspaceLastOpenedAt(workspace);
    return result;
  },

  create: async (workspaceId: string, namespace: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);

    await checkNamespaceDuplicated(workspace.path, namespace, languageCodes);
    await createNamespace(workspace.path, namespace, languageCodes);
    await updateWorkspaceLastOpenedAt(workspace);
  },

  delete: async (workspaceId: string, namespace: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);

    await deleteNamespace(workspace.path, namespace, languageCodes);
    await updateWorkspaceLastOpenedAt(workspace);
  },
};

export default namespaceService;
