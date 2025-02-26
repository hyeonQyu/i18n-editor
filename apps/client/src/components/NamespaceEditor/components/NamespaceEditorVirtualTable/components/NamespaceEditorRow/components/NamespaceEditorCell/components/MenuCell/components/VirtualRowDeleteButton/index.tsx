import useDeleteVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/VirtualRowDeleteButton/hooks/useDeleteVirtualRow';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, useTheme } from '@mui/material';

function VirtualRowDeleteButton() {
  const {
    palette: { error },
  } = useTheme();

  const deleteVirtualRow = useDeleteVirtualRow();

  const handleClick = () => deleteVirtualRow();

  return (
    <Tooltip title={'삭제'}>
      <IconButton onClick={handleClick}>
        <CloseIcon sx={{ fontSize: '22px', color: error.light }} />
      </IconButton>
    </Tooltip>
  );
}

export default VirtualRowDeleteButton;
