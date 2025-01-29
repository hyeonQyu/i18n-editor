import useQueryGetNamespaces from '@hooks/namespace/useQueryGetNamespaces';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { TIME_UNIT } from 'i18n-editor-common';

const DEFAULT_NAMESPACES: string[] = [];

function useNamespaces() {
  const workspace = useWorkspace();

  const { data: { data: { namespaces } = { namespaces: DEFAULT_NAMESPACES } } = {} } = useQueryGetNamespaces(workspace?.id ?? '', {
    staleTime: TIME_UNIT.unitOfMs.asSecond,
  });

  return namespaces;
}

export default useNamespaces;
