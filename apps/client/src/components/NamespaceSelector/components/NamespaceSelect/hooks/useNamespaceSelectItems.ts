import { NamespaceSelectItem } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import useLocaleNamespaces from '@hooks/namespace/useLocaleNamespaces';
import { useMemo } from 'react';

function useNamespaceSelectItems() {
  const namespaces = useLocaleNamespaces();

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
