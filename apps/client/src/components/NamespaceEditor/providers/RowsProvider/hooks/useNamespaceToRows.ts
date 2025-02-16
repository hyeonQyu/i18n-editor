import { EMPTY_ROWS, RowData } from '@components/NamespaceEditor/defines/table';
import useNamespace from '@hooks/namespace/useNamespace';
import { useMemo } from 'react';

function useNamespaceToRows(): RowData[] {
  const namespace = useNamespace();

  return useMemo(() => {
    if (!namespace) return EMPTY_ROWS;

    const { translations, languageCodes } = namespace;

    const rows: RowData[] = translations.map((translation) => ({
      key: translation.key,
      ...namespace.languageCodes.reduce((acc, code) => {
        acc[code] = translation.value[code] || '';
        return acc;
      }, {} as Partial<Record<string, string>>),
    }));

    const emptyRow: RowData = languageCodes.reduce(
      (acc, code) => {
        acc[code] = '';
        return acc;
      },
      {
        key: '',
      } as RowData,
    );

    return [...rows, emptyRow];
  }, [namespace]);
}

export default useNamespaceToRows;
