import useInvalidateGetNamespaceQuery from '@hooks/namespace/useInvalidateGetNamespaceQuery';
import { useWorkspaceStore } from '@stores/workspace';

function useResetNamespace() {
  const setNamespace = useWorkspaceStore(({ setNamespace }) => setNamespace);
  const invalidateGetNamespaceQuery = useInvalidateGetNamespaceQuery();

  return async () => {
    setNamespace(undefined);
    await invalidateGetNamespaceQuery();
  };
}

export default useResetNamespace;
