import { LocaleJsonInfo } from '@defines/locale-json-info';
import useJsonPreview from '@components/home/components/json-preview/useJsonPreview';
import Scrollbars from 'react-custom-scrollbars';

export interface JsonPreviewProps {
    localeJsonInfo: LocaleJsonInfo;
    isKorean: boolean;
    onDeleteText: (text: string) => void;
}

function JsonPreview(props: JsonPreviewProps) {
    const { textInfos, setScrollBar } = useJsonPreview(props);

    return (
        <>
            <div className={'wrapper'}>
                <Scrollbars
                    ref={(c) => {
                        setScrollBar(c);
                    }}
                    renderTrackHorizontal={() => <div />}
                    renderThumbHorizontal={() => <div />}
                    hideTracksWhenNotNeeded
                    autoHide
                >
                    {textInfos.map(({ keyValue: { key, value }, handleDelete }) => (
                        <div className={'text'} key={key}>
                            <span>
                                {key}: {value}
                            </span>
                            <button className={'delete'} onClick={handleDelete} />
                        </div>
                    ))}
                </Scrollbars>
            </div>

            <style jsx>{`
                .wrapper {
                    width: 100%;
                    height: 600px;
                    background: #e9edf7;
                    border-radius: 24px;
                    padding: 30px;
                }

                .wrapper > :global(div) {
                    width: calc(100% + 20px) !important;
                }

                .text {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    transition: 0.3s;
                }

                .delete {
                    cursor: pointer;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    margin-left: 15px;
                    position: relative;
                    transition: 0.2s;
                }

                .delete:active {
                    top: 1px;
                    left: 1px;
                }

                .delete:before,
                .delete:after {
                    position: absolute;
                    content: '';
                    height: 10px;
                    width: 2px;
                    background-color: #4e5158;
                    left: calc(50% - 1px);
                    top: calc(50% - 5px);
                }

                .delete:before {
                    transform: rotate(45deg);
                }

                .delete:after {
                    transform: rotate(-45deg);
                }
            `}</style>
        </>
    );
}

export default JsonPreview;
