import { NamespaceSelectItem } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import { useGlobalStore } from '@stores/globalStore';
import { useMemo } from 'react';

function useNamespaceSelectValue(): NamespaceSelectItem | undefined {
  const namespace = useGlobalStore(({ namespace }) => namespace);

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
