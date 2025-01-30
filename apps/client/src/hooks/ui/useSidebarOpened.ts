import useUIConfig from '@hooks/ui/useUIConfig';

function useSidebarOpened() {
  const uiConfig = useUIConfig();
  return uiConfig?.sidebarOpened;
}

export default useSidebarOpened;
