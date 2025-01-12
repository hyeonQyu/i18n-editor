import NamespaceEditorCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell';
import { Cell, RowData } from '@components/NamespaceEditor/defines/table';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';
import RowIndexProvider from '@components/NamespaceEditor/providers/RowIndexProvider';
import { createCell } from '@components/NamespaceEditor/utils/cell';
import { useWorkspaceStore } from '@stores/workspace';

interface NamespaceEditorRowProps {
  rowIndex: number;
  row: RowData;
}

function NamespaceEditorRow(props: NamespaceEditorRowProps) {
  const { rowIndex, row } = props;

  const columns = useColumns();

  const namespace = useWorkspaceStore(({ namespace }) => namespace);

  return (
    <RowIndexProvider rowIndex={rowIndex}>
      {columns.map(({ label }) => {
        const cell: Cell = label === '' || !row[label] ? createCell('') : row[label]!;
        return <NamespaceEditorCell key={`${namespace}-${rowIndex}-${label}-${cell.value}`} label={label} cell={cell} />;
      })}
    </RowIndexProvider>
  );
}

export default NamespaceEditorRow;
