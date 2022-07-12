import { SelectProps } from '@components/common/select/select';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export interface IUseSelectParams<T extends number | string>
    extends Pick<SelectProps<T>, 'options' | 'value' | 'boxTitle' | 'disabled' | 'onChange'> {}

export interface IUseSelect<T extends number | string> {
    message: string;
    isMultiSelect: boolean;
    selectedValueSet: Set<T>;
    isOpened: boolean;
    ref: MutableRefObject<HTMLDivElement | null> | null;
    toggleOpen(): void;
    select(value: T, index: number): void;
}

export default function useSelect<T extends number | string>(params: IUseSelectParams<T>): IUseSelect<T> {
    const { options = [], value, boxTitle = '옵션을 선택하세요.', disabled, onChange = () => {} } = params;
    const ref = useRef<HTMLDivElement | null>(null);
    const [message, setMessage] = useState<string>(boxTitle);
    const [nameByValue, setNameByValue] = useState(new Map<T, string>());
    const [selectedValueSet, setSelectedValueSet] = useState(new Set<T>());
    const [isOpened, setIsOpened] = useState(false);
    const isMultiSelect = Array.isArray(value);

    // options 를 Map 형태로 변경
    useEffect(() => {
        setNameByValue((prev) => {
            prev.clear();
            return prev;
        });

        options.forEach(({ value, name }) => {
            setNameByValue((prev) => {
                prev.set(value, name);
                return new Map(prev);
            });
        });
    }, [options]);

    // 선택된 값의 집합 생성
    useEffect(() => {
        if (!value) {
            return;
        }

        if (isMultiSelect) {
            setSelectedValueSet(new Set(value));
        } else {
            setSelectedValueSet(new Set([value]));
        }
    }, [isMultiSelect, value]);

    // 표시되는 메시지
    useEffect(() => {
        if (options.length === 0) {
            setMessage('선택 가능한 옵션이 없습니다.');
            return;
        }

        if (isMultiSelect) {
            let count = 0;
            options.forEach(({ value }) => {
                if (selectedValueSet.has(value)) {
                    count++;
                }
            });

            if (count === 0) {
                setMessage(boxTitle);
                return;
            }
            setMessage(`${count}개 선택 완료`);
        } else {
            if (!value) {
                setMessage(boxTitle);
                return;
            }

            if (!nameByValue.has(value)) {
                // console.warn('Select:', `options 중 value가 ${value}인 값을 가지고 있는 option이 없습니다.`);
                setMessage(boxTitle);
                return;
            }

            setMessage(nameByValue.get(value) ?? boxTitle);
        }
    }, [selectedValueSet, boxTitle, nameByValue, isMultiSelect]);

    const closeSelectBox = (e: any) => {
        if (isOpened && (!ref.current || !ref.current.contains(e.target))) {
            setIsOpened(false);
        }
    };

    // 다른 곳 클릭 시 Select 닫음
    useEffect(() => {
        window.addEventListener('click', closeSelectBox);
        return () => {
            window.removeEventListener('click', closeSelectBox);
        };
    }, [isOpened]);

    const toggleOpen = () => {
        if (disabled) {
            return;
        }
        setIsOpened((prev) => !prev);
    };

    const select = (value: T, index: number) => {
        if (disabled) {
            return;
        }

        onChange(value, !selectedValueSet.has(value), index);
        if (!isMultiSelect) {
            setIsOpened(false);
        }
    };

    return {
        message,
        isMultiSelect,
        selectedValueSet,
        isOpened,
        ref,
        toggleOpen,
        select,
    };
}
