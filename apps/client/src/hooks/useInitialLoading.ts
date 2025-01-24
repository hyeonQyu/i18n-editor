import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInitialLoading() {
  const queryClient = useQueryClient();

  return !queryClient.getQueryData(QUERY_KEY.workspace.getWorkspaces());
}

export default useInitialLoading;
