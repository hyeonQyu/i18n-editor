import useNamespaces from '@hooks/namespace/useNamespaces';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

function useNamespaceDuplicated(namespace: string) {
  const [duplicated, setDuplicated] = useState(false);

  const namespaces = useNamespaces();

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
}

export default useNamespaceDuplicated;
