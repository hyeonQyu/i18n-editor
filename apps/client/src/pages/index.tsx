import DirectorySelector from '@components/DirectorySelector';
import { SELECTOR_MAX_WIDTH } from '@defines/styles';
import { Box } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: `${SELECTOR_MAX_WIDTH}px`,
        margin: '0 auto',
        padding: '80px 0',
      }}
    >
      <DirectorySelector />
    </Box>
  );
}

export default HomePage;
