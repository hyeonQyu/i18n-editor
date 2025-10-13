import {
  DirectoryOnlySwitch,
  DirectorySelectButton,
  ViewTypeSelector,
} from '@/components/FileManagerDialog/components/FileManagerFooter/components';
import { Box } from '@mui/material';

function FileManagerFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '48px',
        }}
      >
        <ViewTypeSelector />
        <DirectoryOnlySwitch />
      </Box>
      <DirectorySelectButton />
    </Box>
  );
}

export default FileManagerFooter;
