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

  return (
    <IconButton
      className={'table'}
      sx={{
        borderRadius: '4px',
        display: 'flex',
        width: '92px',

        ['&.table']: {
          flexDirection: 'column',
        },
      }}
      aria-label={'go to directory'}
    >
      <FolderIcon
        sx={{
          fontSize: '64px',
        }}
      />
      <EllipsisText label={name} variant={'caption'} />
    </IconButton>
  );
}

export default FileEntryIconButton;
