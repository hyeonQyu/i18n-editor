import { QUERY_KEY } from '@/constants';
import { useElectronAPI } from '@/hooks/common';
import { DEFAULT_CONFIG } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

export const useUIConfig = () => {
  const electronAPI = useElectronAPI();

  const { data: ui = DEFAULT_CONFIG.ui } = useQuery({
    queryKey: QUERY_KEY.config.ui.read(),
    queryFn: () => electronAPI.config.ui.read(),
    staleTime: Infinity,
  });

  return ui;
};
