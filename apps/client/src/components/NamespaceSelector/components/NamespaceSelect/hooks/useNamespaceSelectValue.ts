import { NamespaceSelectItem } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import { useWorkspaceStore } from '@stores/workspace';
import { useMemo } from 'react';

function useNamespaceSelectValue(): NamespaceSelectItem | undefined {
  const namespace = useWorkspaceStore(({ namespace }) => namespace);

  return useMemo(
    () =>
      namespace
        ? {
            type: 'namespace',
            label: namespace,
            value: namespace,
          }
        : undefined,
    [namespace],
  );
}

export default useNamespaceSelectValue;
