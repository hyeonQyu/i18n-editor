import NamespaceEditorVirtualTable from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable';
import ColumnProvider from '@components/NamespaceEditor/providers/ColumnProvider';
import RowsProvider from '@components/NamespaceEditor/providers/RowsProvider';
import { Paper } from '@mui/material';

function NamespaceEditor() {
  return (
    <Paper
      style={{ height: '100%' }}
      sx={{
        borderRadius: 0,

        '& > div': {
          borderRadius: 0,
        },
      }}
    >
      <RowsProvider>
        <ColumnProvider>
          <NamespaceEditorVirtualTable />
        </ColumnProvider>
      </RowsProvider>
    </Paper>
  );
}

export default NamespaceEditor;
