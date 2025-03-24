import RowMenu from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu';
import usePopover from '@hooks/usePopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

function RowMenuButton() {
  const { anchorElement, handleOpen, handleClose } = usePopover();

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon sx={{ fontSize: '22px' }} />
      </IconButton>

      <RowMenu anchorElement={anchorElement} onClose={handleClose} />
    </>
  );
}

export default RowMenuButton;
