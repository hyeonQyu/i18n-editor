import { useGlobalStore } from '@/stores/global.store';

export const useWorkspaceId = () => {
  return useGlobalStore((state) => state.workspaceId);
};
