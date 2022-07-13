import React, { ReactElement } from 'react';
import { SelectContext } from './context/selectContext';
import SelectHead from '@components/common/select/components/head/selectHead';
import { SelectBoxOption, SelectValue } from '@components/common/select/defines/selectBoxOption';
import useSelect from '@components/common/select/useSelect';
import SelectOptions from '@components/common/select/components/options/selectOptions';
import useCss from '@hooks/common/useCss';
import { Size } from '@defines/css';

export interface OptionProps extends Omit<SelectBoxOption, 'label'> {
    children: string;
}

export function Option(props: OptionProps) {
    return <></>;
}

export interface SelectProps {
    /** 선택할 수 있는 항목 목록 */
    children: ReactElement<OptionProps> | ReactElement<OptionProps>[];

    /** 선택된 값으로 배열인 경우 다중 선택, number 혹은 string 인 경우 단일 선택 */
    value?: SelectValue | SelectValue[];

    /** 너비 */
    width?: Size;

    /** 필터링 검색바 placeholder, 값이 존재하는 경우에만 검색바가 생김 */
    placeholder?: string;

    /** 선택된 값이 없을 때 출력되는 메시지 */
    boxTitle?: string;

    /** 비활성화 여부 */
    disabled?: boolean;

    /** 특정 옵션 선택 시 실행되는 콜백 */
    onChange?: (value: SelectValue, selected?: boolean, index?: number) => void;

    /** 한번에 보이는 option 최대 갯수 */
    optionSize?: number;
}

function Select(props: SelectProps) {
    const { width = '100%' } = props;
    const select = useSelect({ ...props });
    const { ref } = select;

    const { getSizeCss } = useCss({});

    return (
        <>
            <SelectContext.Provider value={{ props, useHook: select, height: 40 }}>
                <div className={'wrapper'} ref={ref}>
                    <SelectHead />
                    <SelectOptions />
                </div>
            </SelectContext.Provider>

            <style jsx>{`
                .wrapper {
                    padding: 0;
                    ${getSizeCss('width', width)}
                    position: relative;
                }
            `}</style>
        </>
    );
}

export default Select;
