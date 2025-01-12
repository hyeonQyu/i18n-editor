import TextFieldCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';
import { Cell } from '@components/NamespaceEditor/defines/table';

interface ValueCellProps {
  cell: Cell;
}

function ValueCell(props: ValueCellProps) {
  const { cell } = props;

  const isVirtualRow = useIsVirtualRow();

  return <TextFieldCell cell={cell} multiline={true} disabled={isVirtualRow} />;
}

export default ValueCell;
