import { EXTENSIONS_SUFFIX, LanguageCode, removeExtension } from 'i18n-editor-common';
import { getFileNames } from './file';

export const getNamespaceNames = async (workspacePath: string, languageCodes: LanguageCode[]) => {
  const jsonFileNames: string[] = [];

  const jsonFileNamesList = await Promise.all(
    languageCodes.map((languageCode) => {
      const directoryPath = `${workspacePath}/${languageCode}`;
      return getFileNames(directoryPath, [EXTENSIONS_SUFFIX.json]);
    }),
  );

  jsonFileNamesList.forEach((fileNames) => {
    jsonFileNames.push(...fileNames);
  });

  return Array.from(new Set(jsonFileNames)).map(removeExtension);
};
