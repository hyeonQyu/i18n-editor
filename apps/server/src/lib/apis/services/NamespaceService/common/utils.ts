import {
  KeyValuePair,
  LanguageCode,
  NamespaceContent,
  Translation,
  TranslationKey,
  TranslationValue,
  TranslationValueByLanguageCode,
} from 'i18n-editor-common';
import { BadRequestError, NotFoundError } from '../../../../defines/errors';
import { createFileWhenNotExist, readFile, writeFile } from '../../../../utils/file';
import { getLanguageCodes } from '../../../../utils/locale';
import configService from '../../ConfigService';

const languageCodeToNamespaceContent = async (workspacePath: string, namespace: string, languageCode: LanguageCode) => {
  const namespaceFilePath = languageCodeToNamespaceFilePath(workspacePath, namespace, languageCode);
  await createFileWhenNotExist(namespaceFilePath, {});
  return (await readFile(namespaceFilePath)) as NamespaceContent;
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

export const getLanguageCodesByWorkspacePath = async (workspacePath: string) => {
  const languageCodes = await getLanguageCodes(workspacePath);

  if (languageCodes.length === 0) {
    throw new BadRequestError('올바른 locale 디렉토리가 아닙니다.');
  }

  return languageCodes;
};

export const languageCodeToNamespaceFilePath = (workspacePath: string, namespace: string, languageCode: LanguageCode) => {
  return `${workspacePath}/${languageCode}/${namespace}.json`;
};

export const getWorkspacePath = (workspaceId: string) => {
  const workspaceConfig = configService.getWorkspace();

  const workspace = workspaceConfig[workspaceId];

  if (!workspace) {
    throw new NotFoundError('워크스페이스가 없습니다.');
  }

  return workspace.path;
};

export const readTranslations = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
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

export const writeTranslation = async (workspacePath: string, namespace: string, translations: Translation[]) => {
  const namespaceContentByLanguageCode = translationsToNamespaceContentByLanguageCode(translations);

  await Promise.all(
    Object.entries(namespaceContentByLanguageCode).map(([languageCode, namespaceContent]) => {
      const namespaceFilePath = languageCodeToNamespaceFilePath(workspacePath, namespace, languageCode as LanguageCode);
      return writeFile(namespaceFilePath, namespaceContent);
    }),
  );
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
