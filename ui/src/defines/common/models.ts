import { Config } from './config';
import { KeyValuePair } from '@defines/common/keyValuePair';

export interface CommonRes {
    status: number;
}

export interface SaveReq {
    config: Config;
    localeJsonInfo: LocaleJsonInfoVo;
}

export interface SaveRes extends CommonRes {
    localeJsonInfo: LocaleJsonInfoVo;
}

export interface LocaleJsonInfoVo {
    name: string;
    keyValues: KeyValuePair<string, string>[];
}

export interface ConfigReq {
    config: Config;
}

export interface ConfigRes extends CommonRes {
    config: Config;
}
