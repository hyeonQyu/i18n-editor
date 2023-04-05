import { useCallback, useState } from 'react';
import { CustomEventHandler } from '@defines/event';
import { MultiSelectChangeParams, MultiSelectProps } from 'primereact/multiselect';

export interface UseMultiSelectParams<T> {
  initialValue?: T[];
}

export interface UseMultiSelect extends Pick<MultiSelectProps, 'value' | 'onChange'> {
  clear: () => void;
}

export default function useMultiSelect<T extends string = string>(params: UseMultiSelectParams<T>): UseMultiSelect {
  const { initialValue } = params;
  const [value, setValue] = useState<T[] | undefined>(initialValue);

  const onChange: CustomEventHandler<MultiSelectChangeParams> = (e) => {
    setValue(e?.value);
  };

  const clear = useCallback(() => setValue(undefined), []);

  return {
    value,
    onChange,
    clear,
  };
}
