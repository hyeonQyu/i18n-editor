import { Close } from '@mui/icons-material';
import { closeSnackbar, enqueueSnackbar, OptionsWithExtraProps, SnackbarKey, SnackbarMessage, VariantType } from 'notistack';

export const enqueueClosableSnackbar = <V extends VariantType>(
  options: OptionsWithExtraProps<V> & { message?: SnackbarMessage },
): SnackbarKey => {
  const { autoHideDuration = 3000, ...restOptions } = options;

  const snackbarKey = enqueueSnackbar({
    // @ts-ignore
    autoHideDuration,
    ...restOptions,
    action: <Close sx={{ cursor: 'pointer' }} onClick={() => closeSnackbar(snackbarKey)} />,
  });

  return snackbarKey;
};
