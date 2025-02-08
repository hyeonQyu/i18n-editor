import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import useAddWorkspaceClickHandler from '@hooks/workspace/useAddWorkspaceClickHandler';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { MouseEventHandler, useState } from 'react';

function AddButton() {
  const {
    palette: { text },
  } = useTheme();

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const handleClick: MouseEventHandler = (e) => {
    setAnchorElement(e.currentTarget as HTMLElement);
  };

  const handleClose = () => setAnchorElement(null);

  const addWorkspace = useAddWorkspaceClickHandler();
  const addNamespace = useAddNamespaceClickHandler();

  const handleClickAddWorkspace = () => {
    addWorkspace();
    handleClose();
  };

  const handleClickAddNamespace = () => {
    addNamespace();
    handleClose();
  };

  return (
    <>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>

      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            '& .MuiMenuItem-root': {
              color: text.secondary,
            },
          },
        }}
      >
        <MenuItem onClick={handleClickAddWorkspace}>
          <Typography variant="body2">워크스페이스 추가</Typography>
        </MenuItem>
        <MenuItem onClick={handleClickAddNamespace}>
          <Typography variant="body2">네임스페이스 추가</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AddButton;
