import { LanguageCode } from 'i18n-editor-common';
import { BadRequestError } from '../../../defines/errors';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { getLanguageCodesByWorkspacePath, getWorkspacePath, readTranslations, writeTranslation } from './common/utils';

interface Key {
  workspaceId: string;
  namespace: string;
  translationKey: string;
}

interface Value {
  languageCode: LanguageCode;
  value: string;
}

export const updateTranslation = async ({ workspaceId, namespace, translationKey }: Key, { languageCode, value }: Value) => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByWorkspacePath(path);

  const translations =
    namespaceContainer.getTranslations(workspaceId, namespace) ?? (await readTranslations(path, namespace, languageCodes));

  const index = translations.findIndex(({ key }) => key === translationKey);

  if (index === -1) {
    throw new BadRequestError('수정하려는 번역키가 없습니다.');
  }

  translations[index].value[languageCode] = value;

  await writeTranslation(path, namespace, translations);

  namespaceContainer.setTranslations(workspaceId, namespace, translations);
};
