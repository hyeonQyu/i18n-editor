import { LanguageCode, Translation, TranslationKey, TranslationPosition } from 'i18n-editor-common';
import { getLanguageCodes } from '../../../utils/language';
import {
  checkTranslationDuplicated,
  completeTranslation,
  findTranslationIndex,
  getTranslations,
  writeTranslation,
} from '../../../utils/translation';
import { getWorkspaceById, updateWorkspaceLastOpenedAt } from '../../../utils/workspace';

const translationService = {
  getList: async (workspaceId: string, namespace: string) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);

    const result = await getTranslations(workspace.path, namespace, languageCodes);
    await updateWorkspaceLastOpenedAt(workspace);
    return result;
  },

  create: async (
    workspaceId: string,
    namespace: string,
    { position, translation }: { position?: TranslationPosition; translation: Translation },
  ) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    const translations = await getTranslations(workspace.path, namespace, languageCodes);

    checkTranslationDuplicated(translations, translation);

    const index = position ? findTranslationIndex(translations, position.pivotTranslationKey) + position.direction : translations.length;
    translations.splice(index, 0, completeTranslation(languageCodes, translation));

    await writeTranslation(workspace.path, namespace, translations);
    await updateWorkspaceLastOpenedAt(workspace);
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
    await updateWorkspaceLastOpenedAt(workspace);
  },

  delete: async (workspaceId: string, namespace: string, translationKey: TranslationKey) => {
    const workspace = getWorkspaceById(workspaceId);
    const languageCodes = await getLanguageCodes(workspace.path);
    const translations = await getTranslations(workspace.path, namespace, languageCodes);

    const index = findTranslationIndex(translations, translationKey);

    translations.splice(index, 1);
    await writeTranslation(workspace.path, namespace, translations);
    await updateWorkspaceLastOpenedAt(workspace);
  },
};

export default translationService;
