import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetLanguagesQuery() {
  const queryClient = useQueryClient();

  return (workspaceId: string) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.getLanguages({ id: workspaceId }) });
}

export default useInvalidateGetLanguagesQuery;
