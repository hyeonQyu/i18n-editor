import NamespaceEditorCell from '@components/NamespaceEditor/components/NamespaceEditorCell';
import NamespaceEditorHeadCell from '@components/NamespaceEditor/components/NamespaceEditorHeadCell';
import NamespaceEditorScroller from '@components/NamespaceEditor/components/NamespaceEditorScroller';
import NamespaceEditorTable from '@components/NamespaceEditor/components/NamespaceEditorTable';
import NamespaceEditorTableBody from '@components/NamespaceEditor/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from '@components/NamespaceEditor/components/NamespaceEditorTableHead';
import useNamespaceToColumns from '@components/NamespaceEditor/providers/ColumnProvider/hooks/useNamespaceToColumns';
import RowIndexProvider from '@components/NamespaceEditor/providers/RowIndexProvider';
import useNamespaceToRows from '@components/NamespaceEditor/providers/RowsProvider/hooks/useNamespaceToRows';
import { Paper, TableRow } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

function NamespaceEditor() {
  const rows = useNamespaceToRows();
  const columns = useNamespaceToColumns();

  return (
    <Paper style={{ height: '100%', padding: '36px' }}>
      <TableVirtuoso
        data={rows}
        components={{
          Scroller: NamespaceEditorScroller,
          Table: NamespaceEditorTable,
          TableHead: NamespaceEditorTableHead,
          TableRow,
          TableBody: NamespaceEditorTableBody,
        }}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <NamespaceEditorHeadCell key={column.label} column={column} />
            ))}
          </TableRow>
        )}
        itemContent={(rowIndex, row) => (
          <RowIndexProvider rowIndex={rowIndex}>
            {columns.map(({ label }) => {
              const value = row[label]!;
              return <NamespaceEditorCell key={value} defaultValue={value} isKey={label === 'key'} />;
            })}
          </RowIndexProvider>
        )}
      />
    </Paper>
  );
}

export default NamespaceEditor;
