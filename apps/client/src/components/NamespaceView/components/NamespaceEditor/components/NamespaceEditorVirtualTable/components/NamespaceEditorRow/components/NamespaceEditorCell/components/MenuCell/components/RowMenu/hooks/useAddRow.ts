import { useSetRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import { TranslationPosition } from 'i18n-editor-common';

function useAddRow() {
  const setRows = useSetRows();

  return (index: number, position: TranslationPosition) => {
    setRows((prevRows) => {
      const rows = [...prevRows];
      rows.splice(index, 0, {
        key: createCell('', { position }),
      });
      return rows;
    });
  };
}

export default useAddRow;
