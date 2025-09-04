import { QUERY_KEY } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateGetAllLanguageCodesQuery = () => {
  const queryClient = useQueryClient();

  return (workspaceId: string) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.language.getAll({ workspaceId }) });
};
