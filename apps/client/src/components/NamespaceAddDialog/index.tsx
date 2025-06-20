import useNamespaceAddFormSubmit from '@components/NamespaceAddDialog/hooks/useNamespaceAddFormSubmit';
import useNamespaceDuplicated from '@components/NamespaceAddDialog/hooks/useNamespaceDuplicated';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNamespaceAddDialogStore } from '@stores/namespaceAddDialogStore';
import { EXTENSIONS_SUFFIX } from 'i18n-editor-common';
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
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
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
          InputProps={{
            endAdornment: EXTENSIONS_SUFFIX.json,
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
