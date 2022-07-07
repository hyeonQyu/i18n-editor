import { ChangeEventHandler, useState } from 'react';

export interface IUseInputParams {
    initialValue?: string;
    validator?: (value: string) => boolean;
    onBeforeClear?: () => boolean;
}

export interface IUseInput {
    value: string;
    changeValue: (value: string) => void;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClear: () => void;
}

export default function useInput(params: IUseInputParams): IUseInput {
    const { initialValue = '', validator = () => true, onBeforeClear = () => true } = params;
    const [value, setValue] = useState(initialValue);

    const changeValue = (value: string) => {
        setValue(value);
    };

    const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { value: targetValue } = e.target;
        if (validator(targetValue)) {
            setValue(targetValue);
        }
    };

    const onClear = () => {
        if (onBeforeClear()) {
            setValue('');
        }
    };

    return {
        value,
        changeValue,
        onChange,
        onClear,
    };
}
