import CopiableDirectoryPath from '@components/DirectorySelector/components/DirectoryDisplayBar/components/CopiableDirectoryPath';
import { ButtonGroup } from '@mui/material';
import OpenNativeFileExplorerButton from 'components/DirectorySelector/components/DirectoryDisplayBar/components/OpenNativeFileExplorerButton';

function DirectoryDisplayBar() {
  return (
    <>
      <ButtonGroup variant={'contained'} fullWidth size={'large'}>
        <CopiableDirectoryPath />
        <OpenNativeFileExplorerButton />
      </ButtonGroup>
    </>
  );
}

export default DirectoryDisplayBar;
