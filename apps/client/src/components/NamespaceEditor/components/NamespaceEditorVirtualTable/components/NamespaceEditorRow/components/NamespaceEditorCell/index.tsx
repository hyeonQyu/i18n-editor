import KeyCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/KeyCell';
import MenuCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell';
import ValueCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/ValueCell';
import { Cell, ColumnData } from '@components/NamespaceEditor/defines/table';
import { TableCell } from '@mui/material';

interface NamespaceEditorCellProps {
  label: ColumnData['label'];
  cell: Cell;
}

function NamespaceEditorCell(props: NamespaceEditorCellProps) {
  const { label, cell } = props;

  return (
    <TableCell sx={{ padding: 0 }}>
      {(() => {
        switch (label) {
          case '':
            return <MenuCell />;
          case 'key':
            return <KeyCell cell={cell} />;
          default:
            return <ValueCell cell={cell} />;
        }
      })()}
    </TableCell>
  );
}

export default NamespaceEditorCell;
