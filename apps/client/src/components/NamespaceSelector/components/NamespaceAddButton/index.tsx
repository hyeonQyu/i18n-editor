import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';

function NamespaceAddButton() {
  return (
    <Tooltip title={'새로운 namespace 추가'}>
      <Button sx={{ width: '50px' }}>
        <AddIcon />
      </Button>
    </Tooltip>
  );
}

export default NamespaceAddButton;
