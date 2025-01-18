import RowMenuButton from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenuButton';
import VirtualRowDeleteButton from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/VirtualRowDeleteButton';
import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { useRows } from '@components/NamespaceEditor/providers/RowsProvider';
import { Box } from '@mui/material';

function MenuCell() {
  const isVirtualRow = useIsVirtualRow();

  const rowIndex = useRowIndex();
  const rows = useRows();

  const isLastRow = rowIndex === rows.length - 1;

  if (isLastRow && isVirtualRow) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isVirtualRow ? <VirtualRowDeleteButton /> : <RowMenuButton />}
    </Box>
  );
}

export default MenuCell;
