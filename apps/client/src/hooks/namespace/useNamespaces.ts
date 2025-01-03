import useQueryGetWorkspace from '@hooks/workspace/useQueryGetWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { TIME_UNIT } from 'i18n-editor-common';

const DEFAULT_NAMESPACES: string[] = [];

function useNamespaces() {
  const workspace = useWorkspace();

  const { data: { data: { namespaces } = { namespaces: DEFAULT_NAMESPACES } } = {} } = useQueryGetWorkspace(workspace?.id ?? '', {
    staleTime: TIME_UNIT.unitOfMs.asSecond,
  });

  return namespaces;
}

export default useNamespaces;
