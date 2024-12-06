import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import EllipsisText from '@components/EllipsisText';
import FolderIcon from '@mui/icons-material/Folder';
import { IconButton } from '@mui/material';
import { FileEntry } from 'i18n-editor-common';

interface FileEntryIconButtonProps {
  entry: FileEntry;
}

function FileEntryIconButton(props: FileEntryIconButtonProps) {
  const {
    entry: { name },
  } = props;

  const viewType = useFileManagerStore(({ viewType }) => viewType);

  return (
    <IconButton
      className={viewType}
      sx={{
        borderRadius: '4px',
        display: 'flex',

        ['&.table']: {
          flexDirection: 'column',
          width: '92px',
        },

        ['&.list']: {
          width: '100%',
        },
      }}
      aria-label={'go to directory'}
    >
      <FolderIcon
        className={viewType}
        sx={{
          ['&.table']: {
            fontSize: '64px',
          },

          ['&.list']: {
            fontSize: '32px',
          },
        }}
      />
      <EllipsisText
        className={viewType}
        label={name}
        variant={'caption'}
        sx={{
          ['&.list']: {
            textAlign: 'left',
            padding: '0 10px',
          },
        }}
      />
    </IconButton>
  );
}

export default FileEntryIconButton;
