import { DropdownChangeParams, DropdownProps } from 'primereact/dropdown';
import { useState } from 'react';
import { CustomEventHandler } from '@defines/event';

export interface IUseDropdownParams {
  initialValue?: string;
}

export interface IUseDropdown extends Pick<DropdownProps, 'value' | 'onChange'> {
  clear: () => void;
}

function useDropdown(params: IUseDropdownParams): IUseDropdown {
  const { initialValue } = params;
  const [value, setValue] = useState<string | undefined>(initialValue);

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
