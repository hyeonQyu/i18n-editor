import CopiableDirectoryPath from '@components/DirectorySelector/components/DirectoryDisplayBar/components/CopiableDirectoryPath';
import { ButtonGroup } from '@mui/material';
import OpenNativeFileManagerButton from 'components/DirectorySelector/components/DirectoryDisplayBar/components/OpenNativeFileManagerButton';

function DirectoryDisplayBar() {
  return (
    <>
      <ButtonGroup variant={'contained'} fullWidth size={'large'}>
        <CopiableDirectoryPath />
        <OpenNativeFileManagerButton />
      </ButtonGroup>
    </>
  );
}

export default DirectoryDisplayBar;
