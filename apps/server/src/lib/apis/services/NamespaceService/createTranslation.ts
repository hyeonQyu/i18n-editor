import { Translation } from 'i18n-editor-common';
import { ConflictError } from '../../../defines/errors';
import { completeTranslation, getNamespaceDetails, saveNamespaceDetails } from './common/utils';

interface Key {
  workspaceId: string;
  namespace: string;
}

interface Value {
  index: number;
  translation: Translation;
}

export const createTranslation = async ({ workspaceId, namespace }: Key, { index, translation }: Value) => {
  const { languageCodes, translations } = await getNamespaceDetails(workspaceId, namespace);

  const isDuplicated = Boolean(translations.find(({ key }) => translation.key === key));

  if (isDuplicated) {
    throw new ConflictError('이미 동일한 번역키가 존재합니다.');
  }

  translations.splice(index, 0, completeTranslation(languageCodes, translation));

  await saveNamespaceDetails(workspaceId, namespace, translations);
};
