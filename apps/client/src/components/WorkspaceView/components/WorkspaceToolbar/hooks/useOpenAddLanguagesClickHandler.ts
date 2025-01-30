import useOpenLanguageCodesDialog from '@hooks/useOpenLanguageCodesDialog';
import useWorkspaceId from '@hooks/workspace/useWorkspaceId';

function useOpenAddLanguagesClickHandler() {
  const workspaceId = useWorkspaceId();
  const openLanguageCodesDialog = useOpenLanguageCodesDialog();

  return () => {
    if (!workspaceId) return;
    openLanguageCodesDialog(workspaceId);
  };
}

export default useOpenAddLanguagesClickHandler;
