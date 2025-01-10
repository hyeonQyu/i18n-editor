import NamespaceEditorCell from '@components/NamespaceEditor/components/NamespaceEditorCell';
import NamespaceEditorScroller from '@components/NamespaceEditor/components/NamespaceEditorScroller';
import NamespaceEditorTable from '@components/NamespaceEditor/components/NamespaceEditorTable';
import NamespaceEditorTableBody from '@components/NamespaceEditor/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from '@components/NamespaceEditor/components/NamespaceEditorTableHead';
import useEditorColumns from '@components/NamespaceEditor/hooks/useEditorColumns';
import useEditorRows from '@components/NamespaceEditor/hooks/useEditorRows';
import RowIndexProvider from '@components/NamespaceEditor/providers/RowIndexProvider';
import { Paper, TableCell, TableRow } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

function NamespaceEditor() {
  const rows = useEditorRows();
  const columns = useEditorColumns();

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
            {columns.map(({ label }) => (
              <TableCell key={label} variant={'head'}>
                {label}
              </TableCell>
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
