import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetWorkspaceQuery(id: string) {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries(QUERY_KEY.workspace.getWorkspace({ id }));
}

export default useInvalidateGetWorkspaceQuery;
