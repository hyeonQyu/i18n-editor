import { useSelectNewWorkspaceDirectory } from '@/hooks/domains/workspace';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';

function HomeView() {
  const {
    palette: { primary, text },
  } = useTheme();

  const selectNewWorkspaceDirectory = useSelectNewWorkspaceDirectory();

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            width: 82,
            height: 82,
            border: `1px solid ${primary.main}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GTranslateIcon color={'primary'} sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant={'h1'} color={'primary'}>
          i18n Editor
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <Typography variant={'body1'} color={text.secondary}>
          번역 디렉토리를 선택하여 새로운 워크스페이스를 생성하세요
        </Typography>
        <Button
          onClick={() => selectNewWorkspaceDirectory()}
          variant={'contained'}
          sx={{
            display: 'flex',
            borderRadius: '8px',
            width: '300px',
            height: '56px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <Typography variant={'body1'} color={'white'}>
            디렉토리 선택하고 시작
          </Typography>
          <CreateNewFolderIcon sx={{ fontSize: 32, color: 'white' }} />
        </Button>
      </Box>
    </Paper>
  );
}

export default HomeView;
