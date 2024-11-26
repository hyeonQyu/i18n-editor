import {
  CommonNamespaceRequest,
  GetNamespaceRequest,
  GetNamespaceResponse,
  KeyValuePair,
  LanguageCode,
  NamespaceContent,
  Translation,
  TranslationKey,
  TranslationValue,
  TranslationValueByLanguageCode,
} from 'i18n-editor-common';
import { createFileWhenNotExist, readFile } from '../../../utils/file';
import { getLanguageCodesByLocaleDirectoryPath, languageCodeToNamespaceFilePath } from './common/utils';

const languageCodeToNamespaceContent = async (
  namespaceRequest: CommonNamespaceRequest,
  languageCode: LanguageCode,
): Promise<NamespaceContent> => {
  const namespaceFilePath = languageCodeToNamespaceFilePath(namespaceRequest, languageCode);

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

const getTranslations = async (namespaceRequest: CommonNamespaceRequest, languageCodes: LanguageCode[]): Promise<Translation[]> => {
  const languageContentPairs: Array<KeyValuePair<LanguageCode, NamespaceContent>> = await Promise.all(
    languageCodes.map(async (languageCode) => {
      try {
        const content = await languageCodeToNamespaceContent(namespaceRequest, languageCode);

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

export const getNamespace: (req: GetNamespaceRequest) => Promise<GetNamespaceResponse> = async (req) => {
  const languageCodes = await getLanguageCodesByLocaleDirectoryPath(req.localeDirectoryPath);
  const translations = await getTranslations(req, languageCodes);

  return {
    languageCodes,
    translations,
  };
};
