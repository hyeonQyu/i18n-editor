import { EXTENSIONS_SUFFIX, LanguageCode, removeExtension } from '@i18n-editor/shared';
import { getFileNames, getIsExistFile } from './file.utils';

export const getAllNamespaces = async (workspacePath: string, languageCodes: LanguageCode[]) => {
  const jsonFileNamesList = await Promise.all(
    languageCodes.map((languageCode) => {
      const directoryPath = `${workspacePath}/${languageCode}`;
      return getFileNames(directoryPath, [EXTENSIONS_SUFFIX.json]);
    }),
  );

  return Array.from(new Set(jsonFileNamesList.flat())).map(removeExtension);
};

export const checkNamespaceDuplicated = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  return languageCodes.some((languageCode) => getIsExistFile(`${workspacePath}/${languageCode}/${namespace}.json`));
};

export const getNamespacePath = (workspacePath: string, namespace: string, languageCode: LanguageCode) => {
  return `${workspacePath}/${languageCode}/${namespace}.json`;
};
