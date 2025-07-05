import { LanguageGetAllRequest } from '@i18n-editor/shared';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useInvalidateGetAllLanguageCodesQuery = () => {
  const queryClient = useQueryClient();

  return (request: LanguageGetAllRequest) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.language.getAll(request) });
};
