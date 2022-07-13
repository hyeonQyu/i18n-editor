import { SelectBoxOption } from '@components/common/select/defines/selectBoxOption';
import { useSelectContext } from '@components/common/select/context/selectContext';
import Checkbox from '@components/common/checkbox/checkbox';
import useSelectOption from '@components/common/select/components/options/components/option/useSelectOption';
import classNames from 'classnames';
import Shortening from '@components/common/shortening/shortening';

export interface SelectOptionProps {
    option: SelectBoxOption;
    index: number;
}

function SelectOption<T extends number | string>(props: SelectOptionProps) {
    const { option, index } = props;
    const { value, label, disabled = false } = option;
    const { useHook, height } = useSelectContext();
    const { selectedValueSet, isMultiSelect, select } = useHook;
    const { selected, handleSelect } = useSelectOption({ select, value, selectedValueSet, index, disabled });

    return (
        <>
            <li className={'option'}>
                <div
                    className={classNames('option-inner', !isMultiSelect && selected && 'selected', disabled && 'disabled')}
                    onClick={handleSelect}
                >
                    {isMultiSelect ? (
                        <Checkbox checked={selected}>
                            <Shortening lineHeight={2}>{label}</Shortening>
                        </Checkbox>
                    ) : (
                        <Shortening lineHeight={2}>{label}</Shortening>
                    )}
                </div>
            </li>

            <style jsx>{`
                .option {
                    height: ${height}px;
                    padding: 4px 10px;
                    background: white;
                    color: #444444;
                    border-radius: 20px;
                }

                .option-inner {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    border-radius: 20px;
                    cursor: pointer;
                }

                .option-inner:hover,
                .option-inner.selected {
                    background: aliceblue;
                }

                .option-inner.disabled {
                    background: white;
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}

export default SelectOption;
