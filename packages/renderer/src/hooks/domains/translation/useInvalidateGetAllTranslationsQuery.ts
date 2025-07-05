import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { TranslationGetAllRequest } from '@i18n-editor/shared';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateGetAllTranslationsQuery = () => {
  const queryClient = useQueryClient();

  return (request: TranslationGetAllRequest) =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.translation.getAll(request) });
};
