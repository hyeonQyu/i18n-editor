import KeyCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/KeyCell';
import MenuCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell';
import ValueCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/ValueCell';
import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { TableCell } from '@mui/material';

interface NamespaceEditorCellProps {
  label: ColumnData['label'];
  value: string;
}

function NamespaceEditorCell(props: NamespaceEditorCellProps) {
  const { label, value } = props;

  return (
    <TableCell sx={{ padding: 0 }}>
      {(() => {
        switch (label) {
          case '':
            return <MenuCell />;
          case 'key':
            return <KeyCell value={value} />;
          default:
            return <ValueCell value={value} />;
        }
      })()}
    </TableCell>
  );
}

export default NamespaceEditorCell;
