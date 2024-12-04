import { DIRECTORY_PATH_ID, FILE_MANAGER_ID } from '@components/DirectorySelector/defines/attributes';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import { directoryPath } from '@defines/tmp';
import useCopyClipboard from '@hooks/useCopyClipboard';
import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { MouseEventHandler } from 'react';

function CopiableDirectoryPath() {
  const { open, anchorElement } = useFileManagerStore();

  const copyClipboard = useCopyClipboard();

  const handleClickPath: MouseEventHandler = (e) => {
    open(e.target as HTMLElement);
  };

  const handleClickCopy: MouseEventHandler = (e) => {
    e.stopPropagation();
    copyClipboard(directoryPath);
  };

  return (
    <Tooltip title={directoryPath} placement={'bottom-start'}>
      <Box
        id={DIRECTORY_PATH_ID}
        aria-controls={anchorElement ? FILE_MANAGER_ID : undefined}
        aria-haspopup
        aria-expanded={anchorElement ? 'true' : undefined}
        aria-label={'directory path'}
        role={'button'}
        onClick={handleClickPath}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingRight: '16px',
          transition: '0.2s',
          cursor: 'pointer',

          '&:hover:not(:has(.copy:hover))': {
            backgroundColor: grey[100],
          },
          '&:active:not(:has(.copy:hover))': {
            backgroundColor: grey[300],
            transition: '0.2s',
          },
        }}
      >
        <Box
          sx={{
            paddingLeft: '24px',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant={'body1'} title={directoryPath} sx={{ height: '100%', display: 'flex', alignItems: 'center' }} tabIndex={0}>
            {directoryPath}
          </Typography>
        </Box>

        <Tooltip title={'경로 복사'}>
          <IconButton aria-label={'copy'} className={'copy'} size={'small'} onClick={handleClickCopy}>
            <ContentCopy fontSize={'small'} />
          </IconButton>
        </Tooltip>
      </Box>
    </Tooltip>
  );
}

export default CopiableDirectoryPath;
