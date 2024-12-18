import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetWorkspacesQuery() {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries(QUERY_KEY.workspace.getWorkspaces());
}

export default useInvalidateGetWorkspacesQuery;
