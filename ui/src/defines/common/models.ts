import { LocaleJsonInfo } from './locale-json-info';

export interface SaveReq {
    localeJsonInfo: LocaleJsonInfo;
    localeDirectoryPath: string;
}
