import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { GetNamespaceResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useNamespaceToColumns(namespace: GetNamespaceResponse): ColumnData[] {
  return useMemo(() => {
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
