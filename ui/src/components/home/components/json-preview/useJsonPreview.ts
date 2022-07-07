import { JsonPreviewProps } from '@components/home/components/json-preview/jsonPreview';
import { KeyValuePair } from '@defines/keyValuePair';

export interface IUseJsonPreviewParams extends JsonPreviewProps {}

export interface IUseJsonPreview {
    keyValues: KeyValuePair<string, string>[];
}

export default function useJsonPreview(params: IUseJsonPreviewParams): IUseJsonPreview {
    const { localeJsonInfo, isKorean } = params;

    const getJsonInfo = (): KeyValuePair<string, string>[] => {
        const messages = Array.from(localeJsonInfo.messageSet);

        if (isKorean) {
            return messages.map((message) => ({
                key: message,
                value: message,
            }));
        }
        return messages.map((message) => ({
            key: message,
            value: '',
        }));
    };

    const keyValues: KeyValuePair<string, string>[] = getJsonInfo();

    return {
        keyValues,
    };
}
