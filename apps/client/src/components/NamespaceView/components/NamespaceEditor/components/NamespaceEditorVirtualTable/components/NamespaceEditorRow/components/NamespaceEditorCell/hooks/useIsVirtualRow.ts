import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowIndexProvider';
import { useRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';

function useIsVirtualRow() {
  const rowIndex = useRowIndex();
  const rows = useRows();

  return !rows[rowIndex]?.key.value;
}

export default useIsVirtualRow;
