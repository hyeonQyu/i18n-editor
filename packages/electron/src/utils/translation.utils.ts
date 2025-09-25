import {
  KeyValuePair,
  LanguageCode,
  NamespaceContent,
  Translation,
  TranslationKey,
  TranslationNotFoundError,
  TranslationValue,
  TranslationValueByLanguageCode,
  Workspace,
} from '@i18n-editor/shared';
import { difference } from 'lodash';
import { createFileWhenNotExist, deleteFile, readFile, writeFile } from './file.utils';
import { getAllLanguageCodes } from './langauge.utils';

const getNamespaceFilePath = (workspacePath: string, namespace: string, languageCode: LanguageCode) => {
  return `${workspacePath}/${languageCode}/${namespace}.json`;
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

const languageContentPairsToTranslations = (languageContentPairs: Array<KeyValuePair<LanguageCode, NamespaceContent>>): Translation[] => {
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

export const getAllTranslations = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  const languageCodeToContentPairs = async (languageCode: LanguageCode) => {
    const namespaceFilePath = getNamespaceFilePath(workspacePath, namespace, languageCode);
    await createFileWhenNotExist(namespaceFilePath, {});
    const content = (await readFile(namespaceFilePath)) as NamespaceContent;

    return {
      key: languageCode,
      value: content,
    };
  };

  const languageContentPairs: Array<KeyValuePair<LanguageCode, NamespaceContent>> = await Promise.all(
    languageCodes.map(languageCodeToContentPairs),
  );

  return languageContentPairsToTranslations(languageContentPairs);
};

export const completeTranslation = (languageCodes: LanguageCode[], translation: Translation): Translation => {
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

const translationsToNamespaceContentByLanguageCode = (translations: Translation[]): Partial<Record<LanguageCode, NamespaceContent>> => {
  const namespaceContentByLanguageCode: Partial<Record<LanguageCode, NamespaceContent>> = {};

  translations.forEach((translation) => {
    const { key, value: translationValueByLanguageCode } = translation;

    Object.entries(translationValueByLanguageCode).forEach(([languageCode, translationValue]) => {
      const namespaceContent = namespaceContentByLanguageCode[languageCode as LanguageCode] || {};
      namespaceContent[key] = translationValue;
      namespaceContentByLanguageCode[languageCode as LanguageCode] = namespaceContent;
    });
  });

  return namespaceContentByLanguageCode;
};

export const writeTranslation = async (workspace: Workspace, namespace: string, translations: Translation[]) => {
  const namespaceContentByLanguageCode = translationsToNamespaceContentByLanguageCode(translations);

  const prevLanguageCodes = await getAllLanguageCodes(workspace);
  const languageCodes = Object.keys(namespaceContentByLanguageCode) as LanguageCode[];

  const removedLanguageCodes = difference(prevLanguageCodes, languageCodes);

  await Promise.all([
    ...Object.entries(namespaceContentByLanguageCode).map(([languageCode, namespaceContent]) => {
      const namespaceFilePath = getNamespaceFilePath(workspace.path, namespace, languageCode as LanguageCode);
      return writeFile(namespaceFilePath, namespaceContent);
    }),
    ...removedLanguageCodes.map((languageCode) => {
      const namespaceFilePath = getNamespaceFilePath(workspace.path, namespace, languageCode);
      return deleteFile(namespaceFilePath);
    }),
  ]);
};

export const checkTranslationDuplicated = (translations: readonly Translation[], translation: Translation) => {
  return translations.some(({ key }) => key === translation.key);
};

export const findTranslationIndex = (translations: readonly Translation[], translationKey: TranslationKey) => {
  const index = translations.findIndex(({ key }) => key === translationKey);
  if (index === -1) throw new TranslationNotFoundError('Translation not found');
  return index;
};
