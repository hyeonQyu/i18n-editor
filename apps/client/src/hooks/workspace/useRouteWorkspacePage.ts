import { useGlobalStore } from '@stores/global';

function useRouteWorkspacePage() {
  return useGlobalStore((state) => state.setWorkspaceId);
}

export default useRouteWorkspacePage;
