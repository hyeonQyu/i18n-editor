import NamespaceEditorHeadCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorFixedHeaderContent/components/NamespaceEditorHeadCell';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';
import { TableRow } from '@mui/material';

function NamespaceEditorFixedHeaderContent() {
  const columns = useColumns();

  return (
    <TableRow>
      {columns.map((column) => (
        <NamespaceEditorHeadCell key={column.label} column={column} />
      ))}
    </TableRow>
  );
}

export default NamespaceEditorFixedHeaderContent;
