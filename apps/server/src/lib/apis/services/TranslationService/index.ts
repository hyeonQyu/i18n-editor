import { LanguageCode, Translation, TranslationKey } from 'i18n-editor-common';
import { getLanguageCodes } from '../../../utils/language';
import {
  checkTranslationDuplicated,
  completeTranslation,
  findTranslationIndex,
  getTranslations,
  writeTranslation,
} from '../../../utils/translation';
import { getWorkspaceById } from '../../../utils/workspace';

const translationService = {
  getList: async (workspaceId: string, namespace: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    return getTranslations(workspace.path, namespace, languageCodes);
  },

  create: async (workspaceId: string, namespace: string, { index, translation }: { index: number; translation: Translation }) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    const translations = await getTranslations(workspace.path, namespace, languageCodes);

    checkTranslationDuplicated(translations, translation);

    translations.splice(index, 0, completeTranslation(languageCodes, translation));
    await writeTranslation(workspace.path, namespace, translations);
  },

  update: async (
    workspaceId: string,
    namespace: string,
    translationKey: TranslationKey,
    { languageCode: languageCode, value }: { languageCode: LanguageCode; value: string },
  ) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    const translations = await getTranslations(workspace.path, namespace, languageCodes);

    const index = findTranslationIndex(translations, translationKey);

    translations[index].value[languageCode] = value;
    await writeTranslation(workspace.path, namespace, translations);
  },

  delete: async (workspaceId: string, namespace: string, translationKey: TranslationKey) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    const translations = await getTranslations(workspace.path, namespace, languageCodes);

    const index = findTranslationIndex(translations, translationKey);

    translations.splice(index, 1);
    await writeTranslation(workspace.path, namespace, translations);
  },
};

export default translationService;
