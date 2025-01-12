import { CellError } from '@components/NamespaceEditor/defines/table';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { useSetRows } from '@components/NamespaceEditor/providers/RowsProvider';

function useSetCellError() {
  const rowIndex = useRowIndex();

  const setRows = useSetRows();

  return (error: CellError | undefined) => {
    setRows((prevRows) => {
      const rows = [...prevRows];
      rows[rowIndex].key.metadata.error = error;
      return rows;
    });
  };
}

export default useSetCellError;
