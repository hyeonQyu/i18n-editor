import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';
import { TableCell } from '@mui/material';

interface NamespaceEditorHeadCellProps {
  column: ColumnData;
}

function NamespaceEditorHeadCell(props: NamespaceEditorHeadCellProps) {
  const { column } = props;
  const { label } = column;

  const columns = useColumns();
  const width = `${100 / columns.length}%`;

  return (
    <TableCell variant={'head'} sx={{ color: '#ffffff' }} width={width}>
      {label}
    </TableCell>
  );
}

export default NamespaceEditorHeadCell;
