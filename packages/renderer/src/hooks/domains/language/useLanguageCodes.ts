import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { LanguageGetAllRequest, LanguageGetAllResponse } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_RESPONSE: LanguageGetAllResponse = { languageCodes: [] };

export const useLanguageCodes = (workspaceId: string) => {
  const electronAPI = useElectronAPI();

  const request: LanguageGetAllRequest = { workspaceId };

  const { data: { languageCodes } = DEFAULT_RESPONSE } = useQuery({
    queryKey: QUERY_KEY.workspace.language.getAll(request),
    queryFn: () => electronAPI.workspace.language.getAll(request),
    enabled: Boolean(workspaceId),
  });

  return languageCodes;
};
