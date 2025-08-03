import { QUERY_KEY } from '@/constants';
import { LanguageGetAllRequest } from '@i18n-editor/shared';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateGetAllLanguageCodesQuery = () => {
  const queryClient = useQueryClient();

  return (request: LanguageGetAllRequest) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.language.getAll(request) });
};
