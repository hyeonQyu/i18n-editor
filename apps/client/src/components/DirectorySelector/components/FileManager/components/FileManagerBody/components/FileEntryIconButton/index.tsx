import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import EllipsisText from '@components/EllipsisText';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon/SvgIcon';
import { FileEntry, FileEntryType } from 'i18n-editor-common';

interface FileEntryIconButtonProps {
  entry: FileEntry;
}

const ICON_BY_TYPE: Record<FileEntryType, typeof SvgIcon> = {
  directory: FolderIcon,
  file: DescriptionIcon,
  unknown: QuestionMarkIcon,
};

function FileEntryIconButton(props: FileEntryIconButtonProps) {
  const {
    entry: { name, type },
  } = props;

  const viewType = useFileManagerStore(({ viewType }) => viewType);

  const Icon = ICON_BY_TYPE[type];

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
      disabled={type !== 'directory'}
    >
      <Icon
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
