import NamespaceEditorCell from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell';
import { Cell, RowData } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { useColumns } from '@components/NamespaceView/components/NamespaceEditor/providers/ColumnProvider';
import RowProvider from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import useNamespace from '@hooks/namespace/useNamespace';

interface NamespaceEditorRowProps {
  rowIndex: number;
  row: RowData;
}

function NamespaceEditorRow(props: NamespaceEditorRowProps) {
  const { rowIndex, row } = props;

  const columns = useColumns();

  const namespace = useNamespace();

  return (
    <RowProvider rowIndex={rowIndex} row={row}>
      {columns.map(({ label }) => {
        const cell: Cell = label === '' || !row[label] ? createCell('') : row[label]!;
        return <NamespaceEditorCell key={`${namespace}-${rowIndex}-${label}-${cell.value}`} label={label} cell={cell} />;
      })}
    </RowProvider>
  );
}

export default NamespaceEditorRow;
