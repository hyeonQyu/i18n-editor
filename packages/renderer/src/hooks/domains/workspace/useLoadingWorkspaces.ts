import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useIsFetching } from '@tanstack/react-query';

export const useLoadingWorkspaces = () => {
  const isFetching = useIsFetching({ queryKey: QUERY_KEY.workspace.getAll() });

  return Boolean(isFetching);
};
