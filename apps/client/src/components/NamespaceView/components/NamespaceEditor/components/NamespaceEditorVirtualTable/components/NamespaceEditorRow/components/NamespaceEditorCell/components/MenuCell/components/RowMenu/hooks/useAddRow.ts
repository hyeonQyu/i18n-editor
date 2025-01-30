import { useSetRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';

function useAddRow() {
  const setRows = useSetRows();

  return (index: number) => {
    setRows((prevRows) => {
      const rows = [...prevRows];
      rows.splice(index, 0, {
        key: createCell(''),
      });
      return rows;
    });
  };
}

export default useAddRow;
