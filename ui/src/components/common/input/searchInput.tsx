import Input, { InputProps } from '@components/common/input/Input';
import SearchIcon from '@icons/searchIcon';
import useCss from '@hooks/common/useCss';

export interface SearchInputProps extends InputProps {}

function SearchInput(props: SearchInputProps) {
    const { width, ...rest } = props;
    const { getSizeCss } = useCss({});

    return (
        <>
            <div className={'wrapper'}>
                <Input {...rest} />
                <div className={'icon'}>
                    <SearchIcon />
                </div>
            </div>

            <style jsx>{`
                .wrapper {
                    ${getSizeCss('width', width)};
                    position: relative;
                }

                .icon {
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translate(0, -50%);
                }

                :global(input) {
                    padding-right: 36px !important;
                }
            `}</style>
        </>
    );
}

export default SearchInput;
