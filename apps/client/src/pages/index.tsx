import DirectorySelector from '@components/DirectorySelector';
import { Box } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <DirectorySelector />
    </Box>
  );
}

export default HomePage;
