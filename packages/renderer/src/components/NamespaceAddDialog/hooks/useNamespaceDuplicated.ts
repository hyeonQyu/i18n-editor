import { useNamespaces } from '@/hooks/domains/namespace/useNamespaces';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const useNamespaceDuplicated = (namespace: string) => {
  const [duplicated, setDuplicated] = useState(false);

  const workspaceId = useWorkspaceId();
  const namespaces = useNamespaces(workspaceId);

  const debounceCheckDuplicated = useMemo(
    () =>
      debounce((allNamespaces: string[], currentNamespace: string) => {
        setDuplicated(allNamespaces.includes(currentNamespace));
      }, 300),
    [],
  );

  useEffect(() => {
    debounceCheckDuplicated(namespaces, namespace);
  }, [debounceCheckDuplicated, namespace, namespaces]);

  return duplicated;
};
