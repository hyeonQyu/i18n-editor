import { ColumnData, EMPTY_COLUMNS } from '@components/NamespaceEditor/defines/table';
import useNamespace from '@hooks/namespace/useNamespace';
import { useMemo } from 'react';

function useNamespaceToColumns(): ColumnData[] {
  const namespace = useNamespace();

  return useMemo(() => {
    if (!namespace) return EMPTY_COLUMNS;

    return [
      {
        label: '',
      },
      {
        label: 'key',
      },
      ...namespace.languageCodes.map((code) => ({ label: code })),
    ];
  }, [namespace]);
}

export default useNamespaceToColumns;
