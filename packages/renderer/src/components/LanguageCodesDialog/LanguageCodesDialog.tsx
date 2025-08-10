import { useLanguageCodesDialogStore } from '@/components/LanguageCodesDialog/stores/languageCodesDialog.store';
import { useCreateMultipleLanguageCodes, useLanguageCodes } from '@/hooks/domains/language';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';
import { LANGUAGE_CODES, LanguageCode } from '@i18n-editor/shared';
import { Autocomplete, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FormEventHandler, SyntheticEvent, useMemo, useState } from 'react';

function LanguageCodesDialog() {
  const opened = useLanguageCodesDialogStore((store) => store.opened);
  const close = useLanguageCodesDialogStore((store) => store.close);

  const handleClose = () => close();

  const workspaceId = useLanguageCodesDialogStore((store) => store.workspaceId);

  const existingLanguageCodes = useLanguageCodes(workspaceId);

  const selectableLanguageCodes = useMemo(
    () => LANGUAGE_CODES.filter((code) => !existingLanguageCodes.includes(code)),
    [existingLanguageCodes],
  );

  const [selectedLanguageCodes, setSelectedLanguageCodes] = useState<LanguageCode[]>([]);

  const createLanguageCodes = useCreateMultipleLanguageCodes();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await createLanguageCodes({ workspaceId, languageCodes: selectedLanguageCodes });

    enqueueClosableSnackbar({
      message: '언어가 추가되었습니다.',
      variant: 'success',
    });

    handleClose();
  };

  const handleChange = (_: SyntheticEvent, value: LanguageCode[]) => setSelectedLanguageCodes(value);

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: { width: '500px' },
        },
      }}
    >
      <DialogTitle>언어 추가</DialogTitle>

      <DialogContent>
        <Box component={'ul'} sx={{ display: 'flex', gap: '12px' }}>
          {existingLanguageCodes.map((code) => (
            <li key={code}>
              <Chip label={code} />
            </li>
          ))}
        </Box>

        <Box
          sx={{
            paddingTop: '24px',
          }}
        >
          <Autocomplete
            multiple
            fullWidth
            options={selectableLanguageCodes}
            renderInput={(params) => <TextField label="언어 선택" {...params} />}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          취소
        </Button>
        <Button variant={'contained'} type={'submit'} disabled={!selectedLanguageCodes.length}>
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LanguageCodesDialog;
