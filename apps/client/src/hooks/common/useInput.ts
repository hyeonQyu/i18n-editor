import { ChangeEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface IUseInputParams {
  initialValue?: string;
  validator?: (value: string) => boolean;
  onBeforeClear?: () => boolean;
  onChangeValue?: (value: string) => void;
  autoFocus?: boolean;
}

export interface IUseInput {
  value: string;
  changeValue: (value: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  clear: () => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
}

function useInput(params: IUseInputParams): IUseInput {
  const { initialValue = '', validator = () => true, onBeforeClear = () => true, onChangeValue = () => {}, autoFocus } = params;
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = inputRef.current;
    if (element && autoFocus) {
      element.focus();
    }
  }, [autoFocus]);

  const changeValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
    (e) => {
      const { value: targetValue } = e.target;
      if (validator(targetValue)) {
        setValue(targetValue);
      }
    },
    [validator],
  );

  const clear = useCallback(() => {
    if (onBeforeClear()) {
      setValue('');
    }
  }, [onBeforeClear]);

  useEffect(() => {
    onChangeValue(value);
  }, [value]);

  return {
    value,
    changeValue,
    onChange,
    clear,
    inputRef,
    autoFocus,
  };
}

export default useInput;
