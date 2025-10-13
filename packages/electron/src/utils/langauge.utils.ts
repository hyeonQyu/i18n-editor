import { DEFAULT_LANGUAGE, InvalidWorkspaceError, LANGUAGE_CODE_SET, LanguageCode, Workspace } from '@i18n-editor/shared';
import { Dirent } from 'fs';
import { readDirectory } from './file.utils';

const checkIsLanguageDirectory = (dirent: Dirent) => {
  return dirent.isDirectory() && LANGUAGE_CODE_SET.has(dirent.name);
};

export const getAllLanguageCodes = async ({ path, defaultLanguage = DEFAULT_LANGUAGE }: Workspace) => {
  const languageCodes = (await readDirectory(path, { withFileTypes: true }))
    .filter(checkIsLanguageDirectory)
    .map((dirent) => dirent.name as LanguageCode)
    .sort((a, b) => {
      if (a === defaultLanguage) return -1;
      if (b === defaultLanguage) return 1;
      return a.localeCompare(b);
    });

  if (languageCodes.length === 0) {
    throw new InvalidWorkspaceError('Workspace has no language');
  }

  return languageCodes;
};
