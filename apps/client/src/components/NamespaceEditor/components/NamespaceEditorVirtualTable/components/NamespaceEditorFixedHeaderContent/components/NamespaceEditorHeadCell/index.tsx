import useDefaultColumnWidth from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorFixedHeaderContent/components/NamespaceEditorHeadCell/hooks/useDefaultColumnWidth';
import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { TableCell } from '@mui/material';

interface NamespaceEditorHeadCellProps {
  column: ColumnData;
}

function NamespaceEditorHeadCell(props: NamespaceEditorHeadCellProps) {
  const { column } = props;
  const { label } = column;

  const isMenuColumn = label === '';

  const width = useDefaultColumnWidth(isMenuColumn);

  return (
    <TableCell
      variant={'head'}
      sx={{ color: '#ffffff' }}
      style={{
        width,
      }}
    >
      {label}
    </TableCell>
  );
}

export default NamespaceEditorHeadCell;
