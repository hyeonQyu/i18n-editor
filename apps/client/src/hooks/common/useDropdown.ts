import { DropdownChangeParams, DropdownProps } from 'primereact/dropdown';
import { useState } from 'react';
import { CustomEventHandler } from '@defines/event';

export interface UseDropdownParams<T> {
  initialValue?: T;
}

export interface UseDropdown extends Pick<DropdownProps, 'value' | 'onChange'> {
  clear: () => void;
}

function useDropdown<T extends string = string>(params: UseDropdownParams<T>): UseDropdown {
  const { initialValue } = params;
  const [value, setValue] = useState<T | undefined>(initialValue);

  const onChange: CustomEventHandler<DropdownChangeParams> = (e) => {
    setValue(e?.value);
  };

  const clear = () => setValue(undefined);

  return {
    value,
    onChange,
    clear,
  };
}

export default useDropdown;
