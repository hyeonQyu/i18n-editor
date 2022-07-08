export interface LocaleJsonInfo {
    name: string;
    textSet: Set<string>;
}

export type LocaleJson = {
    [key in string]: string;
};
