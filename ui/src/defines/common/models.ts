import { Config } from './config';

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
    texts: string[];
}

export interface ConfigRes extends CommonRes {
    config?: Config;
}
