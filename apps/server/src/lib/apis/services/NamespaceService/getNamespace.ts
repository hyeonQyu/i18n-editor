import {
  KeyValuePair,
  LanguageCode,
  NamespaceContent,
  Translation,
  TranslationKey,
  TranslationValue,
  TranslationValueByLanguageCode,
  type GetNamespaceResponse,
} from 'i18n-editor-common';
import { createFileWhenNotExist, readFile } from '../../../utils/file';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { getLanguageCodesByLocaleDirectoryPath, getWorkspacePath, languageCodeToNamespaceFilePath } from './common/utils';

const languageCodeToNamespaceContent = async (workspacePath: string, namespace: string, languageCode: LanguageCode) => {
  const namespaceFilePath = languageCodeToNamespaceFilePath(workspacePath, namespace, languageCode);
  await createFileWhenNotExist(namespaceFilePath, {});
  return await readFile(namespaceFilePath);
};

const updateTranslationMap = (
  translationMap: Map<TranslationKey, TranslationValueByLanguageCode>,
  translationOption: {
    languageCode: LanguageCode;
    key: TranslationKey;
    value: TranslationValue;
  },
) => {
  const { languageCode, key: translationKey, value: translationValue } = translationOption;

  const translationValueByLanguageCode = translationMap.get(translationKey);

  if (translationValueByLanguageCode) {
    translationValueByLanguageCode[languageCode] = translationValue;
    return;
  }

  translationMap.set(translationKey, {
    [languageCode]: translationValue,
  });
};

const getTranslationsByLanguageContentPairs = (
  languageContentPairs: Array<KeyValuePair<LanguageCode, NamespaceContent>>,
): Translation[] => {
  const translationMap = new Map<TranslationKey, TranslationValueByLanguageCode>();

  languageContentPairs.forEach(({ key: languageCode, value: content }) => {
    Object.entries(content).forEach(([translationKey, translationValue]) => {
      updateTranslationMap(translationMap, {
        languageCode,
        key: translationKey,
        value: translationValue,
      });
    });
  });

  return Array.from(translationMap).map(([translationKey, translationValueByLanguageCode]) => {
    return {
      key: translationKey,
      value: translationValueByLanguageCode,
    };
  });
};

const getTranslations = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  const languageContentPairs: Array<KeyValuePair<LanguageCode, NamespaceContent>> = await Promise.all(
    languageCodes.map(async (languageCode) => {
      try {
        const content = await languageCodeToNamespaceContent(workspacePath, namespace, languageCode);

        return {
          key: languageCode,
          value: content,
        };
      } catch (e) {
        throw e;
      }
    }),
  );

  return getTranslationsByLanguageContentPairs(languageContentPairs);
};

export const getNamespace: (workspaceId: string, namespace: string) => Promise<GetNamespaceResponse> = async (workspaceId, namespace) => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByLocaleDirectoryPath(path);
  const translations = await getTranslations(path, namespace, languageCodes);

  namespaceContainer.setTranslations(translations);

  return {
    languageCodes,
    translations,
  };
};
