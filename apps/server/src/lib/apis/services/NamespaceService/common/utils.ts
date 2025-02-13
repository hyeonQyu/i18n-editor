import { LanguageCode } from 'i18n-editor-common';
import { BadRequestError, NotFoundError } from '../../../../defines/errors';
import { getLanguageCodes } from '../../../../utils/locale';
import configService from '../../ConfigService';

export const getLanguageCodesByLocaleDirectoryPath = async (workspacePath: string) => {
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
