import { LocaleJsonInfo } from '@defines/locale-json-info';
import useJsonPreview from '@components/home/components/json-preview/useJsonPreview';
import Scrollbars from 'react-custom-scrollbars';

export interface JsonPreviewProps {
    localeJsonInfo: LocaleJsonInfo;
    isKorean: boolean;
}

function JsonPreview(props: JsonPreviewProps) {
    const {} = props;
    const { keyValues } = useJsonPreview(props);

    return (
        <>
            <div className={'wrapper'}>
                <Scrollbars renderTrackHorizontal={() => <div />} renderThumbHorizontal={() => <div />} hideTracksWhenNotNeeded autoHide>
                    {keyValues.map(({ key, value }) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
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
                    line-height: 20px;
                }
            `}</style>
        </>
    );
}

export default JsonPreview;
