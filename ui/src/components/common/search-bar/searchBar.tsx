import { InputHTMLAttributes, MutableRefObject } from 'react';
import SearchIcon from '../../../../../../ts-apigen/ui/src/icons/search/searchIcon';
import useSearchBar from './useSearchBar';
import classNames from 'classnames';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    inputRef?: MutableRefObject<HTMLInputElement | null>;
    height: number;
}

function SearchBar(props: SearchBarProps) {
    const { height, inputRef, ...rest } = props;
    const {
        values: { isFocused },
        handlers: { handleBlur, handleFocus },
    } = useSearchBar(props);

    return (
        <>
            <div className={'search'}>
                <input {...rest} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} />
                <div className={classNames('icon-wrapper', isFocused && 'focused')}>
                    <SearchIcon />
                </div>
            </div>

            <style jsx>{`
                .search {
                    height: ${height}px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 7px 0 15px;
                }

                input {
                    width: calc(100% - 30px);
                    height: 100%;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                .icon-wrapper {
                    background-color: #e5ecef;
                    width: 30px;
                    height: 38px;
                    border-top-right-radius: 40px;
                    border-bottom-right-radius: 40px;
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .icon-wrapper.focused {
                    background-color: #f3f7f8;
                }
            `}</style>
        </>
    );
}

export default SearchBar;
