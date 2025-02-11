import { useWorkspaceStore } from '@stores/workspace';

function useResetNamespace() {
  const setNamespace = useWorkspaceStore(({ setNamespace }) => setNamespace);

  return async () => {
    setNamespace(undefined);
  };
}

export default useResetNamespace;
