import { SelectBoxOption } from '@components/common/select/defines/selectBoxOption';
import { useSelectContext } from '@components/common/select/context/selectContext';
import Checkbox from '@components/common/checkbox/checkbox';
import useSelectBoxOption from '@components/common/select/components/options/components/option/useSelectBoxOption';
import classNames from 'classnames';
import Shortening from '@components/common/shortening/shortening';

export interface SelectOptionProps<T extends number | string> {
    option: SelectBoxOption<T>;
    index: number;
}

function SelectOption<T extends number | string>(props: SelectOptionProps<T>) {
    const { option, index } = props;
    const { value, name, disabled = false } = option;
    const { useHook, height } = useSelectContext();
    const { selectedValueSet, isMultiSelect, select } = useHook;
    const { selected, handleSelect } = useSelectBoxOption<T>({ select, value, selectedValueSet, index, disabled });

    return (
        <>
            <div className={'option'}>
                <div
                    className={classNames('option-inner', !isMultiSelect && selected && 'selected', disabled && 'disabled')}
                    onClick={handleSelect}
                >
                    {isMultiSelect ? (
                        <Checkbox checked={selected}>
                            <Shortening lineHeight={2}>{name}</Shortening>
                        </Checkbox>
                    ) : (
                        <Shortening lineHeight={2}>{name}</Shortening>
                    )}
                </div>
            </div>

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
