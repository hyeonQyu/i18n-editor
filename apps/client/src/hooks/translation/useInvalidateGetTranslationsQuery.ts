import { QUERY_KEY } from '@defines/reactQuery/query';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetTranslationsQuery() {
  const queryClient = useQueryClient();

  return (workspaceId: string, namespace: string) =>
    queryClient.invalidateQueries(QUERY_KEY.workspace.getTranslations({ id: workspaceId, namespace }));
}

export default useInvalidateGetTranslationsQuery;
