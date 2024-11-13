import useCopyClipboard from '@hooks/useCopyClipboard';
import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

function CopiableDirectoryPath() {
  const directoryPath = 'User/midas/Desktop/Projects/Project1';

  const copyClipboard = useCopyClipboard();

  const handleClickCopy = () => copyClipboard(directoryPath);

  return (
    <Box
      aria-label={'directory path'}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        paddingRight: '16px',
      }}
    >
      <Box
        component={'button'}
        sx={{
          paddingLeft: '24px',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography
          role={'button'}
          variant={'body1'}
          title={directoryPath}
          sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
          tabIndex={0}
        >
          {directoryPath}
        </Typography>
      </Box>

      <IconButton aria-label={'copy'} size={'small'} onClick={handleClickCopy}>
        <ContentCopy fontSize={'small'} />
      </IconButton>
    </Box>
  );
}

export default CopiableDirectoryPath;
