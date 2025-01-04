import fs from 'fs';
import {
  CommonNamespaceRequest,
  getLeadingSlash,
  GetNamespaceRequest,
  GetNamespaceResponse,
  KeyValuePair,
  LanguageCode,
  NamespaceContent,
  PostNamespaceRequest,
  PostNamespaceResponse,
  Translation,
  TranslationKey,
  TranslationValue,
  TranslationValueByLanguageCode,
} from 'i18n-editor-common';
import { BadRequestError } from '../../defines/errors';
import { createFileWhenNotExist, readFile, writeFile } from '../../utils/file';
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

const languageCodeToNamespaceFilePath = (namespaceRequest: CommonNamespaceRequest, languageCode: LanguageCode) => {
  const { localeDirectoryPath, namespace } = namespaceRequest;

  const languageDirectoryPath = `${localeDirectoryPath}/${languageCode}`;
  return `${getLeadingSlash(languageDirectoryPath)}/${namespace}.json`;
};

const languageCodeToNamespaceContent = async (
  namespaceRequest: CommonNamespaceRequest,
  languageCode: LanguageCode,
): Promise<NamespaceContent> => {
  const namespaceFilePath = languageCodeToNamespaceFilePath(namespaceRequest, languageCode);

  await createFileWhenNotExist(namespaceFilePath, {});

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

const getIsExistNamespace = (req: CommonNamespaceRequest, languageCodes: LanguageCode[]) => {
  return languageCodes.some((languageCode) => {
    const namespaceFilePath = languageCodeToNamespaceFilePath(req, languageCode);
    return fs.existsSync(namespaceFilePath);
  });
};

const createNewNamespace = async (namespaceFilePath: string) => {
  return await writeFile(namespaceFilePath, {});
};

const getLanguageCodesByLocaleDirectoryPath = async (localeDirectoryPath: string) => {
  const languageCodes = await getLanguageCodes(localeDirectoryPath);

  if (languageCodes.length === 0) {
    throw new Error('올바른 locale 디렉토리가 아닙니다.');
  }

  return languageCodes;
};

const namespaceService = {
  async getNamespace(req: GetNamespaceRequest): Promise<GetNamespaceResponse> {
    const languageCodes = await getLanguageCodesByLocaleDirectoryPath(req.localeDirectoryPath);
    const translations = await getTranslations(req, languageCodes);

    return {
      languageCodes,
      translations,
    };
  },

  async postNamespace(req: PostNamespaceRequest): Promise<PostNamespaceResponse> {
    const languageCodes = await getLanguageCodesByLocaleDirectoryPath(req.localeDirectoryPath);

    if (getIsExistNamespace(req, languageCodes)) {
      throw new BadRequestError('이미 존재하는 namespace 입니다.');
    }

    await Promise.all(
      languageCodes.map(async (languageCode) => {
        const namespaceFilePath = languageCodeToNamespaceFilePath(req, languageCode);
        return await createNewNamespace(namespaceFilePath);
      }),
    );
  },
};

export default namespaceService;
