import { BadRequestError } from '../../../defines/errors';
import { getNamespaceDetails, saveNamespaceDetails } from './common/utils';

interface Key {
  workspaceId: string;
  namespace: string;
  translationKey: string;
}

export const deleteTranslation = async ({ workspaceId, namespace, translationKey }: Key) => {
  const { translations } = await getNamespaceDetails(workspaceId, namespace);

  const index = translations.findIndex(({ key }) => key === translationKey);

  if (index === -1) {
    throw new BadRequestError('수정하려는 번역키가 없습니다.');
  }

  translations.splice(index, 1);

  await saveNamespaceDetails(workspaceId, namespace, translations);
};
