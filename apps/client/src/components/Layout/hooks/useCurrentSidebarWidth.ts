import { SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import useSidebarOpened from '@hooks/ui/useSidebarOpened';

function useCurrentSidebarWidth() {
  const sidebarOpened = useSidebarOpened();
  return sidebarOpened ? SIDEBAR_WIDTH : 0;
}

export default useCurrentSidebarWidth;
