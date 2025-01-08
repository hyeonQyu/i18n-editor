import { CommonNamespaceRequest, getLeadingSlash, LanguageCode } from 'i18n-editor-common';
import { BadRequestError } from '../../../../defines/errors';
import { getLanguageCodes } from '../../../../utils/locale';

export const getLanguageCodesByLocaleDirectoryPath = async (localeDirectoryPath: string) => {
  const languageCodes = await getLanguageCodes(localeDirectoryPath);

  if (languageCodes.length === 0) {
    throw new BadRequestError('올바른 locale 디렉토리가 아닙니다.');
  }

  return languageCodes;
};

export const languageCodeToNamespaceFilePath = (namespaceRequest: CommonNamespaceRequest, languageCode: LanguageCode) => {
  const { localeDirectoryPath, namespace } = namespaceRequest;

  const languageDirectoryPath = `${localeDirectoryPath}/${languageCode}`;
  return `${getLeadingSlash(languageDirectoryPath)}/${namespace}.json`;
};
