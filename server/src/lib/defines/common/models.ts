import { LocaleJsonInfo } from './locale-json-info';
import { Config } from './config';

export interface CommonRes {
    status: number;
}

export interface SaveReq {
    config: Config;
    localeJsonInfo: LocaleJsonInfo;
}

export interface ConfigRes extends CommonRes {
    config?: Config;
}
