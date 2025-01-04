import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import { useGlobalStore } from '@stores/globalStore';

function useNamespaceChangeHandler(): AutocompleteProps<string, false, false, false, ChipTypeMap['defaultComponent']>['onChange'] {
  const setNamespace = useGlobalStore(({ setNamespace }) => setNamespace);

  return (_, value) => {
    if (!value) return;
    setNamespace(value);
  };
}

export default useNamespaceChangeHandler;
