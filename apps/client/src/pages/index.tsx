import DirectorySelector from '@components/DirectorySelector';
import NamespaceSelector from '@components/NamespaceSelector';
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
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}
    >
      <DirectorySelector />
      <NamespaceSelector />
    </Box>
  );
}

export default HomePage;
