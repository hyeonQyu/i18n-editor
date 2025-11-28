import { QUERY_KEY } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateReadEditorConfigQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.config.editor.read() });
};
