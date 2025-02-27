import { LanguageCode, PostNamespaceResponse } from 'i18n-editor-common';
import { BadRequestError } from '../../../defines/errors';
import { getIsExistFile, writeFile } from '../../../utils/file';
import { getWorkspacePath } from '../WorkspaceService/common/utils';
import { getLanguageCodesByWorkspacePath, languageCodeToNamespaceFilePath } from './common/utils';

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
  const workspacePath = getWorkspacePath(workspaceId);
  const languageCodes = await getLanguageCodesByWorkspacePath(workspacePath);

  if (getIsExistNamespace(workspacePath, namespace, languageCodes)) {
    throw new BadRequestError('이미 존재하는 namespace 입니다.');
  }

  await Promise.all(
    languageCodes.map(async (languageCode) => {
      const namespaceFilePath = languageCodeToNamespaceFilePath(workspacePath, namespace, languageCode);
      return await writeNewNamespace(namespaceFilePath);
    }),
  );
};
