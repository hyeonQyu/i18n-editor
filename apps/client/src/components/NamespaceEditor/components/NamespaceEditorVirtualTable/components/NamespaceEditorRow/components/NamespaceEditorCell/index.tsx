import KeyCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/KeyCell';
import ValueCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/ValueCell';
import { TableCell } from '@mui/material';

interface NamespaceEditorCellProps {
  value: string;
  isKey: boolean;
}

function NamespaceEditorCell(props: NamespaceEditorCellProps) {
  const { isKey, value } = props;

  return <TableCell sx={{ padding: 0 }}>{isKey ? <KeyCell value={value} /> : <ValueCell value={value} />}</TableCell>;
}

export default NamespaceEditorCell;
