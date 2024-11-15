import { FILE_MANAGER_ID } from '@components/DirectorySelector/defines/attributes';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import { SELECTOR_MAX_WIDTH } from '@defines/styles';
import { Popover } from '@mui/material';

function FileManager() {
  const { anchorElement, close } = useFileManagerStore();

  const opened = Boolean(anchorElement);

  return (
    <Popover
      id={FILE_MANAGER_ID}
      open={opened}
      anchorEl={anchorElement}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiPopover-paper': {
          width: `${SELECTOR_MAX_WIDTH}px`,
          height: '500px',
          transform: 'translateY(12px) !important',
        },
      }}
    ></Popover>
  );
}

export default FileManager;
