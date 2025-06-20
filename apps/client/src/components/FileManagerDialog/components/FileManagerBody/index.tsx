import FileEntryIconButton from '@components/FileManagerDialog/components/FileManagerBody/components/FileEntryIconButton';
import { FileManagerViewType, useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { FileEntry } from 'i18n-editor-common';
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

export default memo(FileManagerBody);
