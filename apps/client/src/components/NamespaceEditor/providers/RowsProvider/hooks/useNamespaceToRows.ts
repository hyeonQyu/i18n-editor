import { EMPTY_ROWS, RowData } from '@components/NamespaceEditor/defines/table';
import useNamespace from '@hooks/namespace/useNamespace';
import { useMemo } from 'react';

function useNamespaceToRows(): RowData[] {
  const namespace = useNamespace();

  return useMemo(() => {
    if (!namespace) return EMPTY_ROWS;

    return namespace.translations.map((translation) => ({
      key: translation.key,
      ...namespace.languageCodes.reduce((acc, code) => {
        acc[code] = translation.value[code] || '';
        return acc;
      }, {} as Partial<Record<string, string>>),
    }));
  }, [namespace]);
}

export default useNamespaceToRows;
