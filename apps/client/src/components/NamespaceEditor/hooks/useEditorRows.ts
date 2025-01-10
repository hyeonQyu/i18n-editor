import { RowData } from '@components/NamespaceEditor/defines/table';
import useNamespace from '@hooks/namespace/useNamespace';

const EMPTY_ROWS: RowData[] = [];

function useEditorRows(): RowData[] {
  const namespace = useNamespace();

  if (!namespace) return EMPTY_ROWS;

  return namespace.translations.map((translation) => ({
    key: translation.key,
    ...namespace.languageCodes.reduce((acc, code) => {
      acc[code] = translation.value[code] || '';
      return acc;
    }, {} as Partial<Record<string, string>>),
  }));
}

export default useEditorRows;
