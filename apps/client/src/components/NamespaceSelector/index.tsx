import NamespaceAddButton from '@components/NamespaceSelector/components/NamespaceAddButton';
import NamespaceSelect from '@components/NamespaceSelector/components/NamespaceSelect';
import { ButtonGroup } from '@mui/material';
import NamespaceAddDialog from 'components/NamespaceSelector/components/NamespaceAddDialog';

function NamespaceSelector() {
  return (
    <>
      <ButtonGroup variant={'contained'} fullWidth size={'large'}>
        <NamespaceSelect />
        <NamespaceAddButton />
      </ButtonGroup>

      <NamespaceAddDialog />
    </>
  );
}

export default NamespaceSelector;
