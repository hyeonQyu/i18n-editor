import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

function LocaleDirectoryAddButton() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const handleClick = () => openFileManagerDialog();

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default LocaleDirectoryAddButton;
