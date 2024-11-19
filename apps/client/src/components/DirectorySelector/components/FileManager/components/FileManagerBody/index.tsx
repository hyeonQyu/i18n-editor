import FileEntryIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerBody/components/FileEntryIconButton';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { FileEntry } from 'i18n-editor-common';

function FileManagerBody() {
  const entries: FileEntry[] = Array.from({ length: 10 }).map((_, index) => ({
    name: `file${index}`,
    type: 'directory',
  }));

  return (
    <Box
      sx={{
        height: '460px',
        overflowY: 'auto',
        margin: '24px 0',
      }}
    >
      <Grid2 container spacing={2} maxWidth={'100%'} justifyContent={'flex-start'}>
        {entries.map((entry) => (
          <Grid2 key={entry.name} xs={12 / 7} justifyContent={'center'}>
            <FileEntryIconButton entry={entry} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default FileManagerBody;
