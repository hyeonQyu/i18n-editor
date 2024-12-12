import { ColumnData } from '@components/NamespaceEditor/defines/table';
import useNamespace from '@hooks/namespace/useNamespace';

const EMPTY_COLUMNS: ColumnData[] = [];

function useEditorColumns(): ColumnData[] {
  const namespace = useNamespace();

  if (!namespace) return EMPTY_COLUMNS;

  return [
    {
      label: 'key',
    },
    ...namespace.languageCodes.map((code) => ({ label: code })),
  ];
}

export default useEditorColumns;
