import useNamespaceChangeHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceChangeHandler';
import useNamespaces from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaces';
import useNamespaceSelectOpenHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceSelectOpenHandler';
import { Autocomplete, TextField } from '@mui/material';
import { useGlobalStore } from '@stores/globalStore';

function NamespaceSelect() {
  const namespaces = useNamespaces();

  const handleOpen = useNamespaceSelectOpenHandler();
  const handleChange = useNamespaceChangeHandler();

  const namespace = useGlobalStore(({ namespace }) => namespace);

  return (
    <Autocomplete
      fullWidth
      key={namespace}
      value={namespace}
      options={namespaces}
      size={'small'}
      noOptionsText={'결과 없음'}
      onOpen={handleOpen}
      onChange={handleChange}
      disableClearable
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
