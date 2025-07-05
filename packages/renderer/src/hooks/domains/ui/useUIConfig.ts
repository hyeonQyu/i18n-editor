import { useQueryReadUIConfig } from '@/hooks/domains/ui/useQueryReadUIConfig';
import { DEFAULT_CONFIG } from '@i18n-editor/shared';

export const useUIConfig = () => {
  const { data: ui = DEFAULT_CONFIG.ui } = useQueryReadUIConfig({
    staleTime: Infinity,
  });

  return ui;
};
