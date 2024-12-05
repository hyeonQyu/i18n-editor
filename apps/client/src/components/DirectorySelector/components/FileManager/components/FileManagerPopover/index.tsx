import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import { FILE_MANAGER_ID } from '@components/DirectorySelector/defines/attributes';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import { SELECTOR_MAX_WIDTH } from '@defines/styles';
import { Box, Popover } from '@mui/material';
import { ReactNode } from 'react';

interface FileManagerPopoverProps {
  children: ReactNode;
}

function FileManagerPopover(props: FileManagerPopoverProps) {
  const { children } = props;

  const { anchorElement, close } = useFileManagerStore();

  const opened = Boolean(anchorElement);

  const searchMode = useFileManagerSearchStore(({ searchMode }) => searchMode);

  return (
    <Popover
      id={FILE_MANAGER_ID}
      open={opened}
      anchorEl={anchorElement}
      onClose={close}
      disableEscapeKeyDown={searchMode}
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
    >
      <Box
        sx={{
          padding: '20px',
        }}
      >
        {children}
      </Box>
    </Popover>
  );
}

export default FileManagerPopover;
