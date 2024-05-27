import { GetNamespaceRequest, GetNamespaceResponse, LanguageCode } from 'i18n-editor-common';
import { CommonNamespaceRequest } from 'i18n-editor-common/lib/defines/api/models/namespace/_common';
import {
  NamespaceContent,
  Translation,
  TranslationKey,
  TranslationValue,
  TranslationValueByLanguageCode,
} from 'i18n-editor-common/lib/defines/translation';
import { KeyValuePair } from 'i18n-eidtor-client/src/defines';
import { createService } from '../../utils/createService';
import { createFileWhenNotExist, readFile } from '../../utils/file';
import { getLanguageCodes } from '../../utils/locale';

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

const languageCodeToNamespaceContent = async (
  namespaceRequest: CommonNamespaceRequest,
  languageCode: LanguageCode,
): Promise<NamespaceContent> => {
  const { localeDirectoryPath, namespace } = namespaceRequest;

  const languageDirectoryPath = `${localeDirectoryPath}/${languageCode}`;
  const namespaceFilePath = `${languageDirectoryPath}/${namespace}.json`;

  await createFileWhenNotExist(namespaceFilePath, '{}');

  return await readFile(namespaceFilePath);
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

const namespaceService = createService({
  async getNamespace(req: GetNamespaceRequest): Promise<GetNamespaceResponse> {
    const { localeDirectoryPath, namespace } = req;

    const languageCodes = await getLanguageCodes(localeDirectoryPath);

    if (languageCodes.length === 0) {
      throw new Error('올바른 locale 디렉토리가 아닙니다.');
    }

    const translations = await getTranslations(req, languageCodes);

    return {
      languageCodes,
      translations,
    };
  },
});

export default namespaceService;
