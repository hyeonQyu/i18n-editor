import { useLanguageCodesDialogStore } from '@components/LanguageCodesDialog/stores';

function useOpenLanguageCodesDialog() {
  const open = useLanguageCodesDialogStore((state) => state.open);

  return async (workspaceId: string) => open(() => ({ workspaceId }));
}

export default useOpenLanguageCodesDialog;
