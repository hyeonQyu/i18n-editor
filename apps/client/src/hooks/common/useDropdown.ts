import { DropdownChangeParams, DropdownProps } from 'primereact/dropdown';
import { useState } from 'react';
import { CustomEventHandler } from '@defines/event';

export interface IUseDropdownParams<T> {
  initialValue?: T;
}

export interface IUseDropdown extends Pick<DropdownProps, 'value' | 'onChange'> {
  clear: () => void;
}

function useDropdown<T extends string = string>(params: IUseDropdownParams<T>): IUseDropdown {
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
