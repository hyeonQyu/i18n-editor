import { JsonPreviewProps } from '@components/home/components/json-preview/jsonPreview';
import { JsonPreviewTextInfo } from '@components/home/components/json-preview/defines/jsonPreviewDefines';
import Scrollbars from 'react-custom-scrollbars';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IUseJsonPreviewParams extends JsonPreviewProps {}

export interface IUseJsonPreview {
    textInfos: JsonPreviewTextInfo[];
    setScrollBar: Dispatch<SetStateAction<Scrollbars | null>>;
    attachedFile: boolean;
}

export default function useJsonPreview(params: IUseJsonPreviewParams): IUseJsonPreview {
    const { localeJsonInfo, isKorean, onDeleteText } = params;
    const [scrollBar, setScrollBar] = useState<Scrollbars | null>(null);
    const [prevTextCount, setPrevTextCount] = useState(localeJsonInfo.textSet.size);

    useEffect(() => {
        if (!scrollBar) {
            return;
        }

        const { size } = localeJsonInfo.textSet;

        if (prevTextCount + 1 === size) {
            scrollBar.scrollToBottom();
        }

        setPrevTextCount(size);
    }, [localeJsonInfo, scrollBar, prevTextCount]);

    const getTextInfos = (): JsonPreviewTextInfo[] => {
        const texts = Array.from(localeJsonInfo.textSet);

        if (isKorean) {
            return texts.map((text) => ({
                keyValue: {
                    key: text,
                    value: text,
                },
                handleDelete: () => onDeleteText(text),
            }));
        }
        return texts.map((text) => ({
            keyValue: {
                key: text,
                value: '',
            },
            handleDelete: () => onDeleteText(text),
        }));
    };

    const textInfos: JsonPreviewTextInfo[] = getTextInfos();

    const attachedFile = !!localeJsonInfo.name;

    return {
        textInfos,
        setScrollBar,
        attachedFile,
    };
}
