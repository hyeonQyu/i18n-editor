import { IUseSelect } from '@components/common/select/useSelect';
import { SelectOptionProps } from '@components/common/select/components/options/components/option/selectOption';
import { SelectValue } from '@components/common/select/defines/selectBoxOption';

export interface IUseSelectOptionParams extends Pick<IUseSelect, 'select' | 'selectedValueSet'>, Pick<SelectOptionProps, 'index'> {
    value: SelectValue;
    disabled: boolean;
}

export interface IUseSelectOption {
    selected: boolean;
    handleSelect(): void;
}

export default function useSelectOption(params: IUseSelectOptionParams): IUseSelectOption {
    const { select, value, selectedValueSet, index, disabled } = params;

    const handleSelect = () => {
        !disabled && select(value, index);
    };

    const selected = selectedValueSet.has(value);

    return {
        selected,
        handleSelect,
    };
}
