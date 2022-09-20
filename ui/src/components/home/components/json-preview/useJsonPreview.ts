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
    const { filterKeyword, localeJsonInfo, onDeleteText } = params;
    const [scrollBar, setScrollBar] = useState<Scrollbars | null>(null);
    const [prevTextCount, setPrevTextCount] = useState(localeJsonInfo.keyValueSet.size);

    useEffect(() => {
        if (!scrollBar) {
            return;
        }

        const { size } = localeJsonInfo.keyValueSet;

        if (prevTextCount + 1 === size) {
            scrollBar.scrollToBottom();
        }

        setPrevTextCount(size);
    }, [localeJsonInfo, scrollBar, prevTextCount]);

    const getTextInfos = (): JsonPreviewTextInfo[] => {
        const keyValues = Array.from(localeJsonInfo.keyValueSet).filter(({ key }) =>
            key.toLowerCase().includes(filterKeyword.toLowerCase()),
        );

        return keyValues.map((element) => ({
            keyValue: element,
            handleDelete: () => onDeleteText(element),
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
