import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { IUseSelect } from '@components/common/select/useSelect';
import { SelectProps } from '@components/common/select/select';
import { SelectBoxOption } from '@components/common/select/defines/selectBoxOption';
import { ISelectContext } from '@components/common/select/context/selectContext';
import useAnimationMount from '@hooks/common/useAnimationMount';

export interface IUseSelectOptionsParams<T extends number | string>
    extends Pick<IUseSelect<T>, 'isOpened'>,
        Pick<SelectProps<T>, 'options' | 'optionSize' | 'placeholder'>,
        Pick<ISelectContext<T>, 'height'> {
    keyword: string;
    setKeyword: (keyword: string) => void;
}

export interface IUseSelectOptions<T extends number | string> {
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
    mounted: boolean;
    filteredOptions: SelectBoxOption<T>[];
    dropdownHeight: string;
    optionsWrapperHeight: string;
    appearAnimationDuration: number;
    disappearAnimationDuration: number;
}

export default function useSelectOptions<T extends number | string>(params: IUseSelectOptionsParams<T>): IUseSelectOptions<T> {
    const { keyword, setKeyword, isOpened, options = [], optionSize = 20, placeholder, height } = params;
    const searchBarRef = useRef<HTMLInputElement>(null);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropdownHeight, setDropdownHeight] = useState('100%');
    const [optionsWrapperHeight, setOptionsWrapperHeight] = useState('100%');
    const appearAnimationDuration = 0.4;
    const disappearAnimationDuration = 0.2;

    const { mounted } = useAnimationMount({ display: isOpened, disappearAnimationDuration });

    // 필터링 검색어 제거
    useEffect(() => {
        if (!isOpened) {
            setKeyword('');
        }
    }, [isOpened, setKeyword]);

    // 필터링 된 옵션 목록
    useEffect(() => {
        if (!keyword) {
            setFilteredOptions(options);
            return;
        }
        setFilteredOptions(options.filter(({ label }) => label.toLowerCase().indexOf(keyword.toLowerCase()) > -1));
    }, [keyword, options]);

    // 필터링 검색바 focus
    useEffect(() => {
        if (isOpened) {
            setTimeout(() => {
                if (isOpened) {
                    searchBarRef.current?.focus();
                }
            }, appearAnimationDuration);
        }
    }, [isOpened, searchBarRef]);

    // 옵션 UI 높이
    useEffect(() => {
        let length = Math.min(filteredOptions.length, optionSize);
        placeholder && length++;
        setDropdownHeight(`${length * height}px`);
        setOptionsWrapperHeight(placeholder && filteredOptions.length > optionSize ? `calc(100% - ${height}px)` : '100%');
    }, [optionSize, filteredOptions, placeholder, height]);

    return {
        searchBarRef,
        mounted,
        filteredOptions,
        dropdownHeight,
        optionsWrapperHeight,
        appearAnimationDuration,
        disappearAnimationDuration,
    };
}
