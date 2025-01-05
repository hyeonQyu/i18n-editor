import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';

export interface NamespaceSelectItem {
  type: 'namespace' | 'add';
  label: string;
  value: string;
}

export type NamespaceSelectProps = AutocompleteProps<NamespaceSelectItem, false, false, false, ChipTypeMap['defaultComponent']>;
