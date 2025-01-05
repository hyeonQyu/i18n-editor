import { NamespaceSelectItem, NamespaceSelectProps } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import { createFilterOptions } from '@mui/material';

const filter = createFilterOptions<NamespaceSelectItem>();

function useNamespaceFilterHandler(): NamespaceSelectProps['filterOptions'] {
  return (options, params) => {
    const { inputValue } = params;

    const filteredOptions = filter(options, params);

    if (inputValue) {
      filteredOptions.push({
        type: 'add',
        label: `"${inputValue}" 추가`,
        value: inputValue,
      });
    }

    return filteredOptions;
  };
}

export default useNamespaceFilterHandler;
