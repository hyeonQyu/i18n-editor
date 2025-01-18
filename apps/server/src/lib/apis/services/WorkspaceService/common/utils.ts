import { EXTENSIONS_SUFFIX, removeExtension } from 'i18n-editor-common';
import { NotFoundError } from '../../../../defines/errors';
import { getFileNames } from '../../../../utils/file';
import configService from '../../ConfigService';

export const getWorkspacePath = (workspaceId: string) => {
  const workspaceConfig = configService.getWorkspace();

  const workspace = workspaceConfig[workspaceId];

  if (!workspace) {
    throw new NotFoundError('워크스페이스가 없습니다.');
  }

  return workspace.path;
};

export const getAllNamespaces = async (workspacePath: string, languages: string[]) => {
  const jsonFileNames: string[] = [];

  const jsonFileNamesList = await Promise.all(
    languages.map((language) => {
      const directoryPath = `${workspacePath}/${language}`;
      return getFileNames(directoryPath, [EXTENSIONS_SUFFIX.json]);
    }),
  );

  jsonFileNamesList.forEach((fileNames) => {
    jsonFileNames.push(...fileNames);
  });

  return Array.from(new Set(jsonFileNames)).map(removeExtension);
};
