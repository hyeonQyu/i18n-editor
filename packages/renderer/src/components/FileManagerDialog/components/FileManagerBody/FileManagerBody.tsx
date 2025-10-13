import { FileEntryIconButton } from '@/components/FileManagerDialog/components/FileManagerBody/components';
import { FileManagerViewType, useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { FileEntry } from '@i18n-editor/shared';
import { Box, Grid } from '@mui/material';
import { memo } from 'react';

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

interface FileManagerBodyProps {
  entries: FileEntry[];
}

function FileManagerBody(props: FileManagerBodyProps) {
  const { entries } = props;

  const viewType = useFileManagerDialogStore(({ viewType }) => viewType);

  const { spacing, columns } = ATTRIBUTES_BY_VIEW_TYPE[viewType];

  return (
    <Box
      sx={{
        height: '440px',
        overflowY: 'auto',
        margin: '24px 0',
      }}
    >
      <Grid container spacing={spacing} maxWidth={'100%'} justifyContent={'flex-start'}>
        {entries.map((entry) => (
          <Grid key={entry.name} size={12 / columns} justifyContent={'center'}>
            <FileEntryIconButton entry={entry} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default memo(FileManagerBody);
