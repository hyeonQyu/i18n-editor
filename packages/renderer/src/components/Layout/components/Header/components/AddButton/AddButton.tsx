import { usePopover } from '@/hooks/common';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';

function AddButton() {
  const {
    palette: { text },
  } = useTheme();

  const { anchorElement, handleOpen, handleClose } = usePopover();

  const handleClickAddWorkspace = () => {
    // addWorkspace();
    handleClose();
  };

  const handleClickAddNamespace = () => {
    // addNamespace();
    handleClose();
  };

  return (
    <>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleOpen}>
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
