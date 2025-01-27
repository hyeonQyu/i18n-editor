import { getLanguageCodes } from '../../../utils/language';
import { checkNamespaceDuplicated, createNamespace, getNamespaceNames } from '../../../utils/namespace';
import { getWorkspaceById } from '../../../utils/workspace';

const namespaceService = {
  getList: async (workspaceId: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    return getNamespaceNames(workspace.path, languageCodes);
  },

  create: async (workspaceId: string, namespace: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    await checkNamespaceDuplicated(workspace.path, namespace, languageCodes);
    return createNamespace(workspace.path, namespace, languageCodes);
  },
};

export default namespaceService;
