import CopiableDirectoryPath from '@components/DirectorySelector/components/DirectoryDisplayBar/components/CopiableDirectoryPath';
import { Button, ButtonGroup } from '@mui/material';

function DirectoryDisplayBar() {
  return (
    <>
      <ButtonGroup variant={'contained'} fullWidth size={'large'}>
        <CopiableDirectoryPath />
        <Button sx={{ width: '60px' }}>ads</Button>
      </ButtonGroup>
    </>
  );
}

export default DirectoryDisplayBar;
