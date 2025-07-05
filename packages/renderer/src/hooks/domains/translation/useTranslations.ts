import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { TranslationGetAllRequest, TranslationGetAllResponse } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_RESPONSE: TranslationGetAllResponse = { translations: [] };

export const useTranslations = (workspaceId: string, namespace: string) => {
  const electronAPI = useElectronAPI();

  const request: TranslationGetAllRequest = { workspaceId, namespace };

  const { data: { translations } = DEFAULT_RESPONSE } = useQuery({
    queryKey: QUERY_KEY.workspace.translation.getAll(request),
    queryFn: () => electronAPI.workspace.translation.getAll(request),
    enabled: Boolean(workspaceId),
  });

  return translations;
};
