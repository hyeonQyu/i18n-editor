import { type GetNamespaceResponse } from 'i18n-editor-common';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { getNamespaceDetails } from './common/utils';

export const getNamespace: (workspaceId: string, namespace: string) => Promise<GetNamespaceResponse> = async (workspaceId, namespace) => {
  const { languageCodes, translations } = await getNamespaceDetails(workspaceId, namespace);

  namespaceContainer.setLanguageCodes(workspaceId, namespace, languageCodes);
  namespaceContainer.setTranslations(workspaceId, namespace, translations);

  return {
    languageCodes,
    translations,
  };
};
