import DirectoryOnlySwitch from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter/components/DirectoryOnlySwitch';
import DirectorySelectButton from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter/components/DirectorySelectButton';
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
