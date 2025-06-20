import { useGlobalStore } from '@stores/global';

function useWorkspaceId() {
  return useGlobalStore((state) => state.workspaceId);
}

export default useWorkspaceId;
