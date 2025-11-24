import { QUERY_KEY } from '@/constants';
import { useElectronAPI, useOS } from '@/hooks/common';
import { getDefaultConfig } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

export const useUIConfig = () => {
  const electronAPI = useElectronAPI();

  const os = useOS();

  const defaultConfig = getDefaultConfig(os ?? 'linux');

  const { data: ui = defaultConfig.ui } = useQuery({
    queryKey: QUERY_KEY.config.ui.read(),
    queryFn: () => electronAPI.config.ui.read(),
    staleTime: Infinity,
  });

  return ui;
};
