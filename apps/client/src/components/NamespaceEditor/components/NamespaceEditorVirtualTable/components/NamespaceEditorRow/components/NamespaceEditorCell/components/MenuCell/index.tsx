import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton } from '@mui/material';

function MenuCell() {
  const isVirtualRow = useIsVirtualRow();

  if (isVirtualRow) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconButton>
        <MoreVertIcon sx={{ fontSize: '22px' }} />
      </IconButton>
    </Box>
  );
}

export default MenuCell;
