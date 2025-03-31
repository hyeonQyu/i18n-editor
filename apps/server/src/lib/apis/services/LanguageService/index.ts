import { LanguageCode } from 'i18n-editor-common';
import { deleteLanguageCode, getLanguageCodes } from '../../../utils/language';
import { getNamespaceNames } from '../../../utils/namespace';
import { completeTranslation, getTranslations, writeTranslation } from '../../../utils/translation';
import { getWorkspaceById, updateWorkspaceLastOpenedAt } from '../../../utils/workspace';

const languageService = {
  getList: async (workspaceId: string) => {
    const workspace = getWorkspaceById(workspaceId);
    return getLanguageCodes(workspace.path);
  },

  create: async (workspaceId: string, newLanguageCodes: LanguageCode[]) => {
    const workspace = getWorkspaceById(workspaceId);
    const prevLanguageCodes = await getLanguageCodes(workspace.path);
    const namespaces = await getNamespaceNames(workspace.path, prevLanguageCodes);
    const languageCodes = Array.from(new Set([...prevLanguageCodes, ...newLanguageCodes]));

    await Promise.all(
      namespaces.map(async (namespace) => {
        const prevTranslations = await getTranslations(workspace.path, namespace, prevLanguageCodes);
        const translations = prevTranslations.map((translation) => completeTranslation(languageCodes, translation));
        await writeTranslation(workspace.path, namespace, translations);
      }),
    );

    await updateWorkspaceLastOpenedAt(workspace);
  },

  delete: async (workspaceId: string, languageCode: LanguageCode) => {
    const workspace = getWorkspaceById(workspaceId);

    await deleteLanguageCode(workspace.path, languageCode);
    await updateWorkspaceLastOpenedAt(workspace);
  },
};

export default languageService;
