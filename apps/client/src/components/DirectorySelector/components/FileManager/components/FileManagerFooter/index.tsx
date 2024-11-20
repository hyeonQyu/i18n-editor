import DirectorySelectButton from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter/components/DirectorySelectButton';
import ViewTypeSelector from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter/components/ViewTypeSelector';
import { Box } from '@mui/material';

function FileManagerFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '32px',
      }}
    >
      <ViewTypeSelector />
      <DirectorySelectButton />
    </Box>
  );
}

export default FileManagerFooter;
