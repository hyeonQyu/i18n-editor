import useNamespaces from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaces';
import { EXTENSIONS_SUFFIX } from '@defines/extensions';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

function useNamespaceDuplicated(namespace: string) {
  const [duplicated, setDuplicated] = useState(false);

  const namespaces = useNamespaces();

  const debounceCheckDuplicated = useMemo(
    () =>
      debounce((allNamespaces: string[], currentNamespace: string) => {
        setDuplicated(allNamespaces.includes(currentNamespace.concat(EXTENSIONS_SUFFIX.json)));
      }, 300),
    [],
  );

  useEffect(() => {
    debounceCheckDuplicated(namespaces, namespace);
  }, [debounceCheckDuplicated, namespace, namespaces]);

  return duplicated;
}

export default useNamespaceDuplicated;
