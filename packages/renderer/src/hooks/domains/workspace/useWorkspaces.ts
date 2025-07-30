import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { WorkspaceGetAllResponse } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_RESPONSE: WorkspaceGetAllResponse = { workspaces: [] };

export const useWorkspaces = () => {
  const electronAPI = useElectronAPI();

  const { data: { workspaces } = DEFAULT_RESPONSE } = useQuery({
    queryKey: QUERY_KEY.workspace.getAll(),
    queryFn: () => electronAPI.workspace.getAll(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return workspaces;
};
