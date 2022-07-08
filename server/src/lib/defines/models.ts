import { LocaleJsonInfo } from './locale-json-info';

export interface CommonRes {
    status: number;
}

export interface SaveReq {
    localeJsonInfo: LocaleJsonInfo;
    localeDirectoryPath: string;
}
