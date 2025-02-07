import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';
import { useNamespaceAddDialogStore } from '@stores/namespaceAddDialogStore';

function NamespaceAddButton() {
  const open = useNamespaceAddDialogStore(({ open }) => open);

  const handleClick = () => open();

  return (
    <>
      <Tooltip title={'새로운 namespace 추가'}>
        <Button sx={{ width: '50px' }} onClick={handleClick}>
          <AddIcon />
        </Button>
      </Tooltip>
    </>
  );
}

export default NamespaceAddButton;
