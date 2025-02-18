import { useSetRows } from '@components/NamespaceEditor/providers/RowsProvider';

function useAddRow() {
  const setRows = useSetRows();

  return (index: number) => {
    setRows((prevRows) => {
      const rows = [...prevRows];
      rows.splice(index, 0, {
        key: '',
      });
      return rows;
    });
  };
}

export default useAddRow;
