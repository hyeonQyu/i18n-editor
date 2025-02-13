import { LanguageCode, PostNamespaceResponse } from 'i18n-editor-common';
import { BadRequestError } from '../../../defines/errors';
import { getIsExistFile, writeFile } from '../../../utils/file';
import { getLanguageCodesByLocaleDirectoryPath, getWorkspacePath, languageCodeToNamespaceFilePath } from './common/utils';

const getIsExistNamespace = (workspacePath: string, namespace: string, languageCodes: LanguageCode[]) => {
  return languageCodes.some((languageCode) => {
    const namespaceFilePath = languageCodeToNamespaceFilePath(workspacePath, namespace, languageCode);
    return getIsExistFile(namespaceFilePath);
  });
};

const writeNewNamespace = async (namespaceFilePath: string) => {
  return await writeFile(namespaceFilePath, {});
};

export const createNamespace = async (workspaceId: string, namespace: string): Promise<PostNamespaceResponse> => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByLocaleDirectoryPath(path);

  if (getIsExistNamespace(path, namespace, languageCodes)) {
    throw new BadRequestError('이미 존재하는 namespace 입니다.');
  }

  await Promise.all(
    languageCodes.map(async (languageCode) => {
      const namespaceFilePath = languageCodeToNamespaceFilePath(path, namespace, languageCode);
      return await writeNewNamespace(namespaceFilePath);
    }),
  );
};
