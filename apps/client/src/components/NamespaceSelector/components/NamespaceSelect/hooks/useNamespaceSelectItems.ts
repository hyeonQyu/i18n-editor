import { NamespaceSelectItem } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import useNamespaces from '@components/NamespaceSelector/hooks/useNamespaces';
import { useMemo } from 'react';

function useNamespaceSelectItems() {
  const namespaces = useNamespaces();

  return useMemo(
    () =>
      namespaces.map<NamespaceSelectItem>((namespace) => ({
        type: 'namespace',
        label: namespace,
        value: namespace,
      })),
    [namespaces],
  );
}

export default useNamespaceSelectItems;
