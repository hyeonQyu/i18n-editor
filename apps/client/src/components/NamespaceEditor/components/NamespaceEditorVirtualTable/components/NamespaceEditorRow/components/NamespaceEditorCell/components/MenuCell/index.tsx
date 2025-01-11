import RowMenu from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu';
import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';
import usePopover from '@hooks/usePopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton } from '@mui/material';

function MenuCell() {
  const isVirtualRow = useIsVirtualRow();

  const { anchorElement, handleOpen, handleClose } = usePopover();

  if (isVirtualRow) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon sx={{ fontSize: '22px' }} />
        </IconButton>
      </Box>

      <RowMenu anchorElement={anchorElement} onClose={handleClose} />
    </>
  );
}

export default MenuCell;
