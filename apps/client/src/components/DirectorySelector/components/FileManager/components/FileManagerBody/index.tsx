import FileEntryIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerBody/components/FileEntryIconButton';
import { FileManagerViewType, useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { FileEntry } from 'i18n-editor-common';

const ATTRIBUTES_BY_VIEW_TYPE: Record<
  FileManagerViewType,
  {
    spacing: number;
    columns: number;
  }
> = {
  table: {
    spacing: 2,
    columns: 7,
  },
  list: {
    spacing: 1,
    columns: 2,
  },
};

function FileManagerBody() {
  const entries: FileEntry[] = Array.from({ length: 10 }).map((_, index) => ({
    name: `file${index}`,
    type: 'directory',
  }));

  const viewType = useFileManagerStore(({ viewType }) => viewType);

  const { spacing, columns } = ATTRIBUTES_BY_VIEW_TYPE[viewType];

  return (
    <Box
      sx={{
        height: '460px',
        overflowY: 'auto',
        margin: '24px 0',
      }}
    >
      <Grid2 container spacing={spacing} maxWidth={'100%'} justifyContent={'flex-start'}>
        {entries.map((entry) => (
          <Grid2 key={entry.name} xs={12 / columns} justifyContent={'center'}>
            <FileEntryIconButton entry={entry} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default FileManagerBody;
