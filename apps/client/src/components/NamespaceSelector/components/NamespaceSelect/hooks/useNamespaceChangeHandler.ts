import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import { useNamespaceStore } from '@stores/namespaceStore';

function useNamespaceChangeHandler(): AutocompleteProps<string, false, false, false, ChipTypeMap['defaultComponent']>['onChange'] {
  const setNamespace = useNamespaceStore(({ setNamespace }) => setNamespace);

  return (_, value) => {
    if (!value) return;
    setNamespace(value);
  };
}

export default useNamespaceChangeHandler;
