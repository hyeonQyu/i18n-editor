import NamespaceEditorVirtualTable from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable';
import ColumnProvider from '@components/NamespaceEditor/providers/ColumnProvider';
import RowsProvider from '@components/NamespaceEditor/providers/RowsProvider';

function NamespaceEditor() {
  return (
    <RowsProvider>
      <ColumnProvider>
        <NamespaceEditorVirtualTable />
      </ColumnProvider>
    </RowsProvider>
  );
}

export default NamespaceEditor;
