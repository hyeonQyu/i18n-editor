import { type GetNamespaceResponse } from 'i18n-editor-common';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { getLanguageCodesByWorkspacePath, getWorkspacePath, readTranslations } from './common/utils';

export const getNamespace: (workspaceId: string, namespace: string) => Promise<GetNamespaceResponse> = async (workspaceId, namespace) => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByWorkspacePath(path);
  const translations = await readTranslations(path, namespace, languageCodes);

  namespaceContainer.setTranslations(workspaceId, namespace, translations);

  return {
    languageCodes,
    translations,
  };
};
