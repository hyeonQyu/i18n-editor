import React from 'react';
import { SelectProps } from '@components/common/select/select';
import { IUseSelect } from '@components/common/select/useSelect';
import { SelectValue } from '@components/common/select/defines/selectBoxOption';

export interface ISelectContext {
    props: Omit<SelectProps, 'width'>;
    useHook: IUseSelect;
    height: number;
}

export const SelectContext = React.createContext<ISelectContext>({
    props: {
        children: [],
        value: '',
        placeholder: '',
        boxTitle: '',
        disabled: false,
        onChange() {},
        optionSize: 20,
    },
    useHook: {
        options: [],
        ref: null,
        message: '옵션을 선택하세요.',
        isMultiSelect: false,
        selectedValueSet: new Set<SelectValue>(),
        isOpened: false,
        toggleOpen() {},
        select() {},
    },
    height: 40,
});

export const useSelectContext = () => React.useContext(SelectContext);
