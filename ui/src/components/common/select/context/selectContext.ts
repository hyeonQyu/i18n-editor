import React from 'react';
import { SelectProps } from '@components/common/select/select';
import { IUseSelect } from '@components/common/select/useSelect';

export interface ISelectContext<T extends string | number> {
    props: Omit<SelectProps<T>, 'width'>;
    useHook: IUseSelect<T>;
    height: number;
}

export const SelectContext = React.createContext<ISelectContext<any>>({
    props: {
        options: [],
        value: '',
        placeholder: '',
        boxTitle: '',
        disabled: false,
        onChange() {},
        optionSize: 20,
    },
    useHook: {
        ref: null,
        message: '옵션을 선택하세요.',
        isMultiSelect: false,
        selectedValueSet: new Set<string | number>(),
        isOpened: false,
        toggleOpen() {},
        select() {},
    },
    height: 40,
});

export const useSelectContext = () => React.useContext(SelectContext);
