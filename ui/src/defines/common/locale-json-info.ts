import KeyValueSet from '@utils/keyValueSet';

export interface LocaleJsonInfo {
    name: string;
    keyValueSet: KeyValueSet<string, string>;
}

export type LocaleJson = {
    [key in string]: string;
};
