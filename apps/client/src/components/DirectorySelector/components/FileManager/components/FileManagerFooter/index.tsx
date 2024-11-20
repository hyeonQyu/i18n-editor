import ViewTypeSelector from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter/components/ViewTypeSelector';
import { Box } from '@mui/material';

function FileManagerFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ViewTypeSelector />
    </Box>
  );
}

export default FileManagerFooter;
