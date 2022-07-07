export interface LocaleJsonInfo {
    name: string;
    messageSet: Set<string>;
}

export type LocaleJson = {
    [key in string]: string;
};
