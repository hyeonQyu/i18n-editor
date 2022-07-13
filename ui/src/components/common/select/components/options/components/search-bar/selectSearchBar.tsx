import { useSelectContext } from '@components/common/select/context/selectContext';
import { ChangeEventHandler, MutableRefObject } from 'react';
import SearchBar from '@components/common/search-bar/searchBar';

export interface SelectSearchBarProps {
    keyword: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    searchBarRef: MutableRefObject<HTMLInputElement | null>;
}

function SelectSearchBar(props: SelectSearchBarProps) {
    const { props: contextProps, height } = useSelectContext();
    const { placeholder } = contextProps;
    const { onChange, keyword, searchBarRef } = props;

    return (
        <>
            <SearchBar onChange={onChange} value={keyword} placeholder={placeholder} inputRef={searchBarRef} height={height - 2} />

            <style jsx>{``}</style>
        </>
    );
}

export default SelectSearchBar;
