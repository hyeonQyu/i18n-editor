import { LanguageCode, Translation } from 'i18n-editor-common';
import { ConflictError } from '../../../defines/errors';
import { writeFile } from '../../../utils/file';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import {
  getLanguageCodesByWorkspacePath,
  getWorkspacePath,
  languageCodeToNamespaceFilePath,
  readTranslations,
  translationsToNamespaceContentByLanguageCode,
} from './common/utils';

const completeTranslation = (languageCodes: LanguageCode[], translation: Translation): Translation => {
  const translationValue = languageCodes.reduce((acc, languageCode) => {
    if (!acc[languageCode]) {
      acc[languageCode] = '';
    }

    return acc;
  }, translation.value);

  return {
    key: translation.key,
    value: translationValue,
  };
};

export const createTranslation = async (workspaceId: string, namespace: string, translation: Translation, index: number) => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByWorkspacePath(path);

  const translations =
    namespaceContainer.getTranslations(workspaceId, namespace) ?? (await readTranslations(path, namespace, languageCodes));

  const isDuplicated = Boolean(translations.find(({ key }) => translation.key === key));

  if (isDuplicated) {
    throw new ConflictError('이미 동일한 키가 존재합니다.');
  }

  translations.splice(index, 0, completeTranslation(languageCodes, translation));

  const namespaceContentByLanguageCode = translationsToNamespaceContentByLanguageCode(translations);

  await Promise.all(
    Object.entries(namespaceContentByLanguageCode).map(([languageCode, namespaceContent]) => {
      const namespaceFilePath = languageCodeToNamespaceFilePath(path, namespace, languageCode as LanguageCode);
      return writeFile(namespaceFilePath, namespaceContent);
    }),
  );

  namespaceContainer.setTranslations(workspaceId, namespace, translations);
};
