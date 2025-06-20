import { CellError } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { useSetRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';

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
