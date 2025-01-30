import NamespaceEditorVirtualTable from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable';
import ColumnProvider from '@components/NamespaceView/components/NamespaceEditor/providers/ColumnProvider';
import RowsProvider from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';

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
