import { SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import { useLayoutStore } from '@components/Layout/stores';

function useCurrentSidebarWidth() {
  const sidebarOpened = useLayoutStore((state) => state.sidebarOpened);
  return sidebarOpened ? SIDEBAR_WIDTH : 0;
}

export default useCurrentSidebarWidth;
