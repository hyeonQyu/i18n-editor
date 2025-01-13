import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import { TableRow } from '@mui/material';
import NamespaceEditorFixedHeaderContent from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorFixedHeaderContent';
import NamespaceEditorItemContent from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorItemContent';
import NamespaceEditorScroller from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorScroller';
import NamespaceEditorTable from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTable';
import NamespaceEditorTableBody from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from 'components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorTableHead';
import { TableVirtuoso } from 'react-virtuoso';

function NamespaceEditorVirtualTable() {
  const rows = useRows();

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
      itemContent={(rowIndex, row) => <NamespaceEditorItemContent rowIndex={rowIndex} row={row} />}
    />
  );
}

export default NamespaceEditorVirtualTable;
