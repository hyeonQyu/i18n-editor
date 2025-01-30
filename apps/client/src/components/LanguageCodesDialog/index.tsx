import { useLanguageCodesDialogStore } from '@components/LanguageCodesDialog/stores';
import useCreateLanguageCodes from '@hooks/language/useCreateLanguageCodes';
import useQueryGetLanguages from '@hooks/language/useQueryGetLanguages';
import { Autocomplete, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { enqueueClosableSnackbar } from '@utils/snackbar';
import { LanguageCode, LANGUAGE_CODES } from 'i18n-editor-common';
import { FormEventHandler, useMemo, useState } from 'react';

const DEFAULT_LANGUAGE_CODES: LanguageCode[] = [];

function LanguageCodesDialog() {
  const opened = useLanguageCodesDialogStore((state) => state.opened);
  const close = useLanguageCodesDialogStore((state) => state.close);

  const handleClose = () => close();

  const workspaceId = useLanguageCodesDialogStore((state) => state.workspaceId);

  const { data: { data: { languageCodes: existingLanguageCodes } = { languageCodes: DEFAULT_LANGUAGE_CODES } } = {} } =
    useQueryGetLanguages(workspaceId);

  const selectableLanguageCodes = useMemo(
    () => LANGUAGE_CODES.filter((code) => !existingLanguageCodes.includes(code)),
    [existingLanguageCodes],
  );

  const [selectedLanguageCodes, setSelectedLanguageCodes] = useState<LanguageCode[]>([]);

  const createLanguageCodes = useCreateLanguageCodes();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await createLanguageCodes({ id: workspaceId, languageCodes: selectedLanguageCodes });

    enqueueClosableSnackbar({
      message: '언어가 추가되었습니다.',
      variant: 'success',
    });

    handleClose();
  };

  const handleChange = (_, value: LanguageCode[]) => setSelectedLanguageCodes(value);

  return (
    <Dialog open={opened} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit, sx: { width: '500px' } }}>
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
