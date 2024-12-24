import useQueryGetWorkspace from '@hooks/namespace/useQueryGetWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';

const DEFAULT_NAMESPACES: string[] = [];

function useNamespaces() {
  const workspace = useWorkspace();

  const { data: { data: { namespaces } = { namespaces: DEFAULT_NAMESPACES } } = {} } = useQueryGetWorkspace(workspace?.id ?? '');

  return namespaces;
}

export default useNamespaces;
