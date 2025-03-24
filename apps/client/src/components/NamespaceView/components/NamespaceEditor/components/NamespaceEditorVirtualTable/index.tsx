import NamespaceEditorFixedHeaderContent from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorFixedHeaderContent';
import NamespaceEditorRow from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow';
import NamespaceEditorScroller from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorScroller';
import NamespaceEditorTable from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTable';
import NamespaceEditorTableBody from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableHead';
import { useRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import { NAMESPACE_TOOLBAR_HEIGHT } from '@components/NamespaceView/components/NamespaceToolbar/defines/size';
import useNamespace from '@hooks/namespace/useNamespace';
import { TableRow } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

function NamespaceEditorVirtualTable() {
  const rows = useRows();

  const namespace = useNamespace();

  return (
    <TableVirtuoso
      style={{ height: `calc(100% - ${NAMESPACE_TOOLBAR_HEIGHT + 16}px)` }}
      data={rows}
      components={{
        Scroller: NamespaceEditorScroller,
        Table: NamespaceEditorTable,
        TableHead: NamespaceEditorTableHead,
        TableRow,
        TableBody: NamespaceEditorTableBody,
      }}
      fixedHeaderContent={NamespaceEditorFixedHeaderContent}
      itemContent={(rowIndex, row) => <NamespaceEditorRow key={`${namespace}-${rowIndex}`} rowIndex={rowIndex} row={row} />}
    />
  );
}

export default NamespaceEditorVirtualTable;
