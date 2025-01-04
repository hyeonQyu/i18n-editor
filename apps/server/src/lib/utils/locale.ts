import fs from 'fs';
import { getLeadingSlash, LanguageCode, LANGUAGE_CODE_SET } from 'i18n-editor-common';
import { GLOBAL } from '../defines/global';

const isLanguageDirectory = (dirent: fs.Dirent) => {
  return dirent.isDirectory() && LANGUAGE_CODE_SET.has(dirent.name);
};

export const getLanguageCodes = async (localeDirectoryPath: string) => {
  return (await fs.promises.readdir(getLeadingSlash(localeDirectoryPath), { withFileTypes: true }))
    .filter(isLanguageDirectory)
    .map((dirent) => dirent.name as LanguageCode)
    .sort((a, b) => {
      if (a === GLOBAL.defaultLanguage) return -1;
      if (b === GLOBAL.defaultLanguage) return 1;
      return a.localeCompare(b);
    });
};
