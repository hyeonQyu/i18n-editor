import { useLanguageCodesDialogStore } from '@/components/LanguageCodesDialog/stores/languageCodesDialog.store';

export const useOpenLanguageCodesDialog = () => {
  const open = useLanguageCodesDialogStore((store) => store.open);
  return async (workspaceId: string) => open(() => ({ workspaceId }));
};
