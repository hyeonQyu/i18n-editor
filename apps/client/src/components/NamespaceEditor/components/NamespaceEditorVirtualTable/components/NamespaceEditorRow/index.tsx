import NamespaceEditorCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell';
import { RowData } from '@components/NamespaceEditor/defines/table';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';
import RowIndexProvider from '@components/NamespaceEditor/providers/RowIndexProvider';

interface NamespaceEditorRowProps {
  rowIndex: number;
  row: RowData;
}

function NamespaceEditorRow(props: NamespaceEditorRowProps) {
  const { rowIndex, row } = props;

  const columns = useColumns();

  return (
    <RowIndexProvider rowIndex={rowIndex}>
      {columns.map(({ label }) => {
        const value = row[label]!;
        return <NamespaceEditorCell key={label} defaultValue={value} isKey={label === 'key'} />;
      })}
    </RowIndexProvider>
  );
}

export default NamespaceEditorRow;
