import { FocusEventHandler, useState } from 'react';
import { SearchBarProps } from './searchBar';

export interface IUseSearchBarParams extends SearchBarProps {}

export interface IUseSearchBar {
    values: IUseSearchBarValues;
    handlers: IUseSearchBarHandlers;
}

export interface IUseSearchBarValues {
    isFocused: boolean;
}

export interface IUseSearchBarHandlers {
    handleFocus: FocusEventHandler<HTMLInputElement>;
    handleBlur: FocusEventHandler<HTMLInputElement>;
}

export default function useSearchBar(params: IUseSearchBarParams): IUseSearchBar {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        params?.onFocus && params.onFocus(e);
        setIsFocused(true);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        params?.onBlur && params.onBlur(e);
        setIsFocused(false);
    };

    return {
        values: {
            isFocused,
        },
        handlers: {
            handleFocus,
            handleBlur,
        },
    };
}
