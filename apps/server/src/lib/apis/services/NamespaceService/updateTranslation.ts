import { Translation } from 'i18n-editor-common';
import { BadRequestError } from '../../../defines/errors';
import { namespaceContainer } from '../../../utils/namespaceContainer';
import { completeTranslation, getLanguageCodesByWorkspacePath, getWorkspacePath, readTranslations, writeTranslation } from './common/utils';

export const updateTranslation = async (workspaceId: string, namespace: string, translation: Translation) => {
  const path = getWorkspacePath(workspaceId);

  const languageCodes = await getLanguageCodesByWorkspacePath(path);

  const translations =
    namespaceContainer.getTranslations(workspaceId, namespace) ?? (await readTranslations(path, namespace, languageCodes));

  const index = translations.findIndex(({ key }) => key === translation.key);

  if (index === -1) {
    throw new BadRequestError('수정하려는 번역키가 없습니다.');
  }

  translations[index] = completeTranslation(languageCodes, translation);

  await writeTranslation(path, namespace, translations);

  namespaceContainer.setTranslations(workspaceId, namespace, translations);
};
