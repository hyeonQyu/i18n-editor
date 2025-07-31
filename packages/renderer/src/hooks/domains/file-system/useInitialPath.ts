import { useElectronAPI } from '@/hooks/common';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useInitialPath = (hasWorkspace: boolean) => {
  const electronAPI = useElectronAPI();

  return useQuery({
    queryKey: QUERY_KEY.fileSystem.initialPath.read(),
    queryFn: () => electronAPI.fileSystem.initialPath.read(),
    refetchOnWindowFocus: false,
    enabled: hasWorkspace,
  });
};
