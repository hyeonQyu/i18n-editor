import { useOpenLanguageCodesDialog } from '@/components/LanguageCodesDialog';
import { useWorkspaceId } from '@/hooks/domains/workspace';

export const useOpenWorkspaceLanguageCodesDialog = () => {
  const workspaceId = useWorkspaceId();
  const openLanguageCodesDialog = useOpenLanguageCodesDialog();

  return () => {
    if (!workspaceId) return;
    openLanguageCodesDialog(workspaceId);
  };
};
