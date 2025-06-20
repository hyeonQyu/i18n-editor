import { Dirent } from 'fs';
import { LanguageCode, LANGUAGE_CODE_SET } from 'i18n-editor-common';
import { BadRequestError } from '../defines/errors';
import { GLOBAL } from '../defines/global';
import { deleteFile, readDirectory } from './file';

const isLanguageDirectory = (dirent: Dirent) => {
  return dirent.isDirectory() && LANGUAGE_CODE_SET.has(dirent.name);
};

export const getLanguageCodes = async (workspacePath: string): Promise<LanguageCode[]> => {
  const languageCodes = (await readDirectory(workspacePath, { withFileTypes: true }))
    .filter(isLanguageDirectory)
    .map((dirent) => dirent.name as LanguageCode)
    .sort((a, b) => {
      if (a === GLOBAL.defaultLanguage) return -1;
      if (b === GLOBAL.defaultLanguage) return 1;
      return a.localeCompare(b);
    });

  if (languageCodes.length === 0) throw new BadRequestError('올바른 workspace가 아닙니다.');

  return languageCodes;
};

export const deleteLanguageCode = async (workspacePath: string, languageCode: LanguageCode) => {
  const languagePath = `${workspacePath}/${languageCode}`;
  await deleteFile(languagePath);
};
