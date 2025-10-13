import { useWorkspaceTitleStore } from '@/components/WorkspaceView/components/WorkspaceTitle/stores/workspaceTitle.store';

export const useCancelEditWorkspaceName = () => {
  const setIsNameEditing = useWorkspaceTitleStore((store) => store.setIsNameEditing);

  return () => setIsNameEditing(false);
};
