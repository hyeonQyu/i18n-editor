import TextFieldCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';

interface ValueCellProps {
  value: string;
}

function ValueCell(props: ValueCellProps) {
  const { value } = props;

  const isVirtualRow = useIsVirtualRow();

  return <TextFieldCell value={value} multiline={true} disabled={isVirtualRow} />;
}

export default ValueCell;
