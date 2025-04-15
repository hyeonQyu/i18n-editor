import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { useSetRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import { useEffect, useRef } from 'react';

function useTextFieldCellInputRef(isNewKeyCell: boolean) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const setRows = useSetRows();
  const rowIndex = useRowIndex();

  useEffect(() => {
    if (!isNewKeyCell) return;

    setRows((prevRows) => {
      const rows = [...prevRows];
      rows[rowIndex].key.metadata.new = false;
      return rows;
    });

    inputRef.current?.focus();
  }, [isNewKeyCell, rowIndex, setRows]);

  return inputRef;
}

export default useTextFieldCellInputRef;
