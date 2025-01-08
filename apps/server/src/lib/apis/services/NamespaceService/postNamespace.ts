import fs from 'fs';
import { CommonNamespaceRequest, LanguageCode, PostNamespaceRequest, PostNamespaceResponse } from 'i18n-editor-common';
import { BadRequestError } from '../../../defines/errors';
import { writeFile } from '../../../utils/file';
import { getLanguageCodesByLocaleDirectoryPath, languageCodeToNamespaceFilePath } from './common/utils';

const getIsExistNamespace = (req: CommonNamespaceRequest, languageCodes: LanguageCode[]) => {
  return languageCodes.some((languageCode) => {
    const namespaceFilePath = languageCodeToNamespaceFilePath(req, languageCode);
    return fs.existsSync(namespaceFilePath);
  });
};

const createNewNamespace = async (namespaceFilePath: string) => {
  return await writeFile(namespaceFilePath, {});
};

export const postNamespace: (req: PostNamespaceRequest) => Promise<PostNamespaceResponse> = async (req) => {
  const languageCodes = await getLanguageCodesByLocaleDirectoryPath(req.localeDirectoryPath);

  if (getIsExistNamespace(req, languageCodes)) {
    throw new BadRequestError('이미 존재하는 namespace 입니다.');
  }

  await Promise.all(
    languageCodes.map(async (languageCode) => {
      const namespaceFilePath = languageCodeToNamespaceFilePath(req, languageCode);
      return await createNewNamespace(namespaceFilePath);
    }),
  );
};
