import { EXTENSIONS_SUFFIX, LanguageCode, removeExtension } from 'i18n-editor-common';
import { ConflictError } from '../defines/errors';
import { getFileNames, getIsExistFile, writeFile } from './file';

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

export const createNamespace = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  const namespacePaths = languageCodes.map((languageCode) => `${workspacePath}/${languageCode}/${namespace}.json`);
  return Promise.all(namespacePaths.map((namespacePath) => writeFile(namespacePath, {})));
};

export const checkNamespaceDuplicated = async (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  const isDuplicated = languageCodes.some((languageCode) => getIsExistFile(`${workspacePath}/${languageCode}/${namespace}.json`));
  if (isDuplicated) throw new ConflictError('이미 존재하는 네임스페이스입니다.');
};
