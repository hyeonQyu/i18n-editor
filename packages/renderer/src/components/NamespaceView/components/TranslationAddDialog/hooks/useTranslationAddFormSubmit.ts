import { useTranslationAddDialogStore } from '@/components/NamespaceView/components/TranslationAddDialog/stores/translationAddDialog.store';
import { useSelectTranslationKey } from '@/components/NamespaceView/hooks';
import { useNamespace } from '@/hooks/domains/namespace';
import { useCreateTranslation } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { getErrorMessage } from '@/utils/error.utils';
import { FormEventHandler } from 'react';

export const useTranslationAddFormSubmit = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const translationKey = useTranslationAddDialogStore((store) => store.translationKey);
  const close = useTranslationAddDialogStore((store) => store.close);
  const setErrorMessage = useTranslationAddDialogStore((store) => store.setErrorMessage);

  const createTranslation = useCreateTranslation();

  const selectTranslationKey = useSelectTranslationKey();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await createTranslation({
        workspaceId,
        namespace,
        translation: {
          key: translationKey,
          value: {},
        },
      });

      close();
      selectTranslationKey(translationKey);
    } catch (e) {
      setErrorMessage(getErrorMessage(e as Error));
    }
  };

  return handleSubmit;
};
