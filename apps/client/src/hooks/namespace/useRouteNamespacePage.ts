import { useGlobalStore } from '@stores/global';

function useRouteNamespacePage() {
  return useGlobalStore((state) => state.setNamespace);
}

export default useRouteNamespacePage;
