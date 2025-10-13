import { SIDEBAR_WIDTH } from '@/components/Layout/constants/layout.style.constants';
import { useUIConfig } from '@/hooks/domains/ui';

export const useCurrentSidebarWidth = () => {
  const { sidebarOpened } = useUIConfig();
  return sidebarOpened ? SIDEBAR_WIDTH : 0;
};
