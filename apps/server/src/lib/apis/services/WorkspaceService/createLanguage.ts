import { LanguageCode } from 'i18n-editor-common';
import { getLanguageCodes } from '../../../utils/locale';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { completeTranslation, readTranslations, writeTranslation } from '../NamespaceService/common/utils';
import { getAllNamespaces, getWorkspacePath } from './common/utils';

interface Key {
  workspaceId: string;
}

interface Value {
  languageCodes: LanguageCode[];
}

export const createLanguage = async ({ workspaceId }: Key, { languageCodes: newLanguageCodes }: Value) => {
  const workspacePath = getWorkspacePath(workspaceId);
  const prevLanguageCodes = await getLanguageCodes(workspacePath);

  const namespaces = await getAllNamespaces(workspacePath, prevLanguageCodes);

  const languageCodes = Array.from(new Set([...prevLanguageCodes, ...newLanguageCodes]));

  await Promise.all(
    namespaces.map(async (namespace) => {
      const prevTranslations = await readTranslations(workspacePath, namespace, prevLanguageCodes);

      const translations = prevTranslations.map((translation) => completeTranslation(languageCodes, translation));

      await writeTranslation(workspacePath, namespace, translations);

      if (namespaceContainer.checkKeyValid(workspaceId, namespace)) {
        namespaceContainer.setLanguageCodes(workspaceId, namespace, languageCodes);
        namespaceContainer.setTranslations(workspaceId, namespace, translations);
      }
    }),
  );
};
