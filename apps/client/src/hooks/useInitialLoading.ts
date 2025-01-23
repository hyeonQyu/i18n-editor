import { QUERY_KEY } from '@defines/reactQuery';
import { useIsFetching } from '@tanstack/react-query';

function useInitialLoading() {
  const isFetchingWorkspaces = Boolean(useIsFetching(QUERY_KEY.workspace.getWorkspaces()));

  return isFetchingWorkspaces;
}

export default useInitialLoading;
