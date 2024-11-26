import useNamespaceChangeHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceChangeHandler';
import useNamespaceFilterHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceFilterHandler';
import useNamespaceSelectItems from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceSelectItems';
import useNamespaceSelectOpenHandler from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceSelectOpenHandler';
import useNamespaceSelectValue from '@components/NamespaceSelector/components/NamespaceSelect/hooks/useNamespaceSelectValue';
import { Autocomplete, TextField } from '@mui/material';
import { removeExtension } from 'i18n-editor-common';

function NamespaceSelect() {
  const namespaceItems = useNamespaceSelectItems();

  const handleOpen = useNamespaceSelectOpenHandler();
  const handleChange = useNamespaceChangeHandler();
  const handleFilterOptions = useNamespaceFilterHandler();

  const value = useNamespaceSelectValue();

  return (
    <Autocomplete
      fullWidth
      key={value?.label}
      value={value}
      options={namespaceItems}
      getOptionLabel={(option) => removeExtension(option.label)}
      size={'small'}
      noOptionsText={'결과 없음'}
      onOpen={handleOpen}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      filterOptions={handleFilterOptions}
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
