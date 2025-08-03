import { QUERY_KEY } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateReadUIConfigQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.config.ui.read() });
};
