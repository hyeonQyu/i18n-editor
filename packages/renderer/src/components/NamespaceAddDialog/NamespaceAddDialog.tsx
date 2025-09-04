import { useNamespaceAddFormSubmit, useNamespaceDuplicated } from '@/components/NamespaceAddDialog/hooks';
import { useNamespaceAddDialogStore } from '@/components/NamespaceAddDialog/stores/namespaceAddDailog.store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';

function NamespaceAddDialog() {
  const { opened, close, namespace, setNamespace, errorMessage, setErrorMessage } = useNamespaceAddDialogStore();

  const handleClose = () => close();

  const handleSubmit = useNamespaceAddFormSubmit();

  const duplicated = useNamespaceDuplicated(namespace);
  const disabled = !namespace || duplicated;

  useEffect(() => {
    setErrorMessage(duplicated ? '이미 존재하는 namespace 입니다.' : '');
  }, [duplicated, setErrorMessage]);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      disableRestoreFocus
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogTitle>namespace 추가</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin={'dense'}
          name={'namespace'}
          label={'namespace 이름'}
          fullWidth
          variant={'standard'}
          slotProps={{
            input: {
              endAdornment: '.json',
            },
          }}
          value={namespace}
          onChange={(e) => setNamespace(e.target.value)}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      </DialogContent>

      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          취소
        </Button>
        <Button variant={'contained'} type={'submit'} disabled={disabled}>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NamespaceAddDialog;
