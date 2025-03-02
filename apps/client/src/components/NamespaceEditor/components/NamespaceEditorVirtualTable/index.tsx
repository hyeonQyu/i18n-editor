import NamespaceEditorFixedHeaderContent from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorFixedHeaderContent';
import NamespaceEditorRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow';
import NamespaceEditorScroller from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorScroller';
import NamespaceEditorTable from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTable';
import NamespaceEditorTableBody from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableHead';
import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import useNamespace from '@hooks/namespace/useNamespace';
import { TableRow } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';

function NamespaceEditorVirtualTable() {
  const rows = useRows();

  const namespace = useNamespace();

  return (
    <TableVirtuoso
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
