import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { TableCell } from '@mui/material';

interface NamespaceEditorHeadCellProps {
  column: ColumnData;
}

function NamespaceEditorHeadCell(props: NamespaceEditorHeadCellProps) {
  const { column } = props;
  const { label } = column;

  return (
    <TableCell variant={'head'} sx={{ color: '#ffffff' }}>
      {label}
    </TableCell>
  );
}

export default NamespaceEditorHeadCell;
