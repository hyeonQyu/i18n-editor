import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { useSetRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';

function useDeleteVirtualRow() {
  const setRows = useSetRows();

  const rowIndex = useRowIndex();

  return () => setRows((prev) => prev.filter((_, index) => index !== rowIndex));
}

export default useDeleteVirtualRow;
