import { useGlobalStore } from '@/stores/global.store';

export const useSetWorkspace = () => {
  return useGlobalStore((state) => state.setWorkspaceId);
};
