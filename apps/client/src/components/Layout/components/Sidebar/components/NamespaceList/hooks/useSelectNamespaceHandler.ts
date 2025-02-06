import { useWorkspaceStore } from '@stores/workspace';

function useSelectNamespaceHandler() {
  const setNamespace = useWorkspaceStore(({ setNamespace }) => setNamespace);

  const handleSelectNamespace = (namespace: string) => {
    setNamespace(namespace);
  };

  return handleSelectNamespace;
}

export default useSelectNamespaceHandler;
