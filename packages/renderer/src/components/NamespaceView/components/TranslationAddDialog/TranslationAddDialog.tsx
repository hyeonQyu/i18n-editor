import { useTranslationAddFormSubmit } from '@/components/NamespaceView/components/TranslationAddDialog/hooks';
import { useTranslationAddDialogStore } from '@/components/NamespaceView/components/TranslationAddDialog/stores/translationAddDialog.store';
import { useNamespace } from '@/hooks/domains/namespace';
import { useWorkspace } from '@/hooks/domains/workspace';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

function TranslationAddDialog() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const { opened, close, translationKey, setTranslationKey, errorMessage, setErrorMessage } = useTranslationAddDialogStore();

  const handleSubmit = useTranslationAddFormSubmit();
  const handleClose = () => close();

  const readOnlySlotProps = {
    input: {
      readOnly: true,
    },
  };

  const handleChangeTranslationKey: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTranslationKey(e.target.value);
    setErrorMessage('');
  };

  return (
    <Dialog
      fullWidth
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
      <DialogTitle>번역 추가</DialogTitle>

      <DialogContent>
        <Stack sx={{ gap: '32px', padding: '16px' }}>
          <TextField label="워크스페이스" slotProps={readOnlySlotProps} value={workspace?.name} />
          <TextField label="네임스페이스" slotProps={readOnlySlotProps} value={namespace} />
          <TextField
            label="번역 키"
            autoFocus
            required
            name="translationKey"
            variant="standard"
            value={translationKey}
            onChange={handleChangeTranslationKey}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          취소
        </Button>
        <Button variant={'contained'} type={'submit'} disabled={!translationKey}>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TranslationAddDialog;
