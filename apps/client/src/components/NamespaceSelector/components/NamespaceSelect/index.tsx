import useNamespaces from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaces';
import { Autocomplete, TextField } from '@mui/material';

function NamespaceSelect() {
  const namespaces = useNamespaces();

  return (
    <Autocomplete
      fullWidth
      size={'small'}
      options={namespaces}
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
