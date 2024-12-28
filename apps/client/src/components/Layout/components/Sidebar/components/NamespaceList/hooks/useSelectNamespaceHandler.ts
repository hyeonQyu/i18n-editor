import { useWorkspaceStore } from '@stores/workspace';

function useSelectNamespaceHandler() {
  const setNamespace = useWorkspaceStore(({ setNamespace }) => setNamespace);

  return async (namespace: string) => {
    setNamespace(namespace);
  };
}

export default useSelectNamespaceHandler;
