import { LocaleJsonInfo } from '@defines/locale-json-info';

export interface JsonPreviewProps {
    localeJsonInfo?: LocaleJsonInfo;
}

function JsonPreview(props: JsonPreviewProps) {
    const {} = props;

    return (
        <>
            <div className={'wrapper'}>dsafa</div>

            <style jsx>{`
                .wrapper {
                    width: 100%;
                    height: 500px;
                    background: #e9edf7;
                    border-radius: 24px;
                    padding: 30px;
                }
            `}</style>
        </>
    );
}

export default JsonPreview;
