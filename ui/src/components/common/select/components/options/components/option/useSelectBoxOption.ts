import { IUseSelect } from '@components/common/select/useSelect';
import { SelectOptionProps } from '@components/common/select/components/options/components/option/SelectOption';

export interface IUseSelectOptionParams<T extends number | string>
    extends Pick<IUseSelect<T>, 'select' | 'selectedValueSet'>,
        Pick<SelectOptionProps<T>, 'index'> {
    value: T;
    disabled: boolean;
}

export interface IUseSelectOption {
    selected: boolean;
    handleSelect(): void;
}

export default function useSelectBoxOption<T extends number | string>(params: IUseSelectOptionParams<T>): IUseSelectOption {
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
