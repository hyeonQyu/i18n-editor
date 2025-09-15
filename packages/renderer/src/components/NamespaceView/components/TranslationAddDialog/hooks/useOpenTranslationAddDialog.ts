import { useTranslationAddDialogStore } from '@/components/NamespaceView/components/TranslationAddDialog/stores/translationAddDialog.store';

export const useOpenTranslationAddDialog = () => {
  const open = useTranslationAddDialogStore((store) => store.open);

  return () => open(() => ({}));
};
