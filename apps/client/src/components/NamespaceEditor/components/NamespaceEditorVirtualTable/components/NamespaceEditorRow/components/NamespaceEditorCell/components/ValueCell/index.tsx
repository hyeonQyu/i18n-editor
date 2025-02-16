import TextFieldCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';

interface ValueCellProps {
  value: string;
}

function ValueCell(props: ValueCellProps) {
  const { value } = props;

  const rows = useRows();
  const rowIndex = useRowIndex();

  const hasKey = Boolean(rows[rowIndex]?.key);

  return <TextFieldCell value={value} multiline={true} disabled={!hasKey} />;
}

export default ValueCell;
