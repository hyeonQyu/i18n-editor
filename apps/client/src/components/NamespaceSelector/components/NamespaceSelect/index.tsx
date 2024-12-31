import useNamespaces from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaces';
import useNamespaceSelectOpenHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceSelectOpenHandler';
import { Autocomplete, TextField } from '@mui/material';

function NamespaceSelect() {
  const namespaces = useNamespaces();

  const handleOpen = useNamespaceSelectOpenHandler();

  return (
    <Autocomplete
      fullWidth
      size={'small'}
      options={namespaces}
      noOptionsText={'결과 없음'}
      onOpen={handleOpen}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            ['& .MuiAutocomplete-inputRoot']: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          label={'namespace 선택'}
        />
      )}
    />
  );
}

export default NamespaceSelect;
