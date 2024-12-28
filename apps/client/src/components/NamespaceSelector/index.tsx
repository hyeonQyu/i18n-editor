import NamespaceAddButton from '@components/NamespaceSelector/components/NamespaceAddButton';
import NamespaceSelect from '@components/NamespaceSelector/components/NamespaceSelect';
import { ButtonGroup } from '@mui/material';

function NamespaceSelector() {
  return (
    <ButtonGroup variant={'contained'} fullWidth size={'large'}>
      <NamespaceSelect />
      <NamespaceAddButton />
    </ButtonGroup>
  );
}

export default NamespaceSelector;
