import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useInvalidateReadUIConfigQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.config.ui.read() });
};
