import { useSelectContext } from '@components/common/select/context/selectContext';
import SelectOption from '@components/common/select/components/options/components/option/selectOption';
import SelectSearchBar from '@components/common/select/components/options/components/search-bar/selectSearchBar';
import useInput from '@hooks/common/useInput';
import useSelectOptions from '@components/common/select/components/options/useSelectOptions';
import Scrollbars from 'react-custom-scrollbars';
import classNames from 'classnames';

function SelectOptions() {
    const {
        props: { placeholder, optionSize },
        useHook: { options = [], isOpened },
        height,
    } = useSelectContext();
    const { value: keyword, changeValue: setKeyword, onChange } = useInput({});
    const {
        searchBarRef,
        mounted,
        filteredOptions,
        dropdownHeight,
        optionsWrapperHeight,
        appearAnimationDuration,
        disappearAnimationDuration,
    } = useSelectOptions({
        keyword,
        setKeyword,
        isOpened,
        optionSize,
        placeholder,
        height,
        options,
    });

    if (!mounted || options.length === 0) {
        return null;
    }

    return (
        <>
            <div className={classNames('options', !isOpened && 'closed')}>
                {placeholder && <SelectSearchBar keyword={keyword} onChange={onChange} searchBarRef={searchBarRef} />}

                <ul className={classNames('select-box__options-wrapper')}>
                    <Scrollbars renderTrackHorizontal={() => <div />} renderThumbHorizontal={() => <div />} hideTracksWhenNotNeeded>
                        {filteredOptions.map((option, i) => (
                            <SelectOption key={option.value} option={option} index={i} />
                        ))}
                    </Scrollbars>
                </ul>
            </div>

            <style jsx global>{`
                @keyframes open {
                    0% {
                        height: 0;
                    }
                }
                .options {
                    position: absolute;
                    width: 100%;
                    background: white;
                    border-radius: 20px;
                    height: ${dropdownHeight};
                    top: calc(100% + 10px);
                    box-shadow: 5px 6px 25px -16px;
                    z-index: 10;
                    transition: height ${disappearAnimationDuration}s ease-in-out;
                    animation: open ${appearAnimationDuration}s;
                }

                .options.closed {
                    height: 0;
                }

                .select-box__options-wrapper {
                    height: ${optionsWrapperHeight};
                }

                .select-box__options-wrapper > div {
                    border-radius: 20px;
                }
            `}</style>
        </>
    );
}

export default SelectOptions;
