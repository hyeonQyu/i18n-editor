import useQueryGetUIConfig from '@hooks/ui/useQueryGetUIConfig';
import { DEFAULT_CONFIG } from 'i18n-editor-common';

function useUIConfig() {
  const { data: { data: { ui } = { ui: DEFAULT_CONFIG.ui } } = {} } = useQueryGetUIConfig({
    staleTime: Infinity,
  });

  return ui;
}

export default useUIConfig;
