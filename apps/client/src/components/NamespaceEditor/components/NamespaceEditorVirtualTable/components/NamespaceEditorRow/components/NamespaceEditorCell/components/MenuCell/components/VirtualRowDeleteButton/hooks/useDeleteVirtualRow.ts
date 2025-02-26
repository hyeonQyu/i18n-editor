import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { useSetRows } from '@components/NamespaceEditor/providers/RowsProvider';

function useDeleteVirtualRow() {
  const setRows = useSetRows();

  const rowIndex = useRowIndex();

  return () => setRows((prev) => prev.filter((_, index) => index !== rowIndex));
}

export default useDeleteVirtualRow;
