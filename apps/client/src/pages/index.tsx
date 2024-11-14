import DirectorySelector from '@components/DirectorySelector';
import { Box } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '80px 0',
      }}
    >
      <DirectorySelector />
    </Box>
  );
}

export default HomePage;
