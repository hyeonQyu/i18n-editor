export const LANGUAGES = ['ko', 'en', 'zh', 'ja', 'ru', 'fr', 'es', 'de'] as const;

export type Language = typeof LANGUAGES[number];

export enum LanguageNameByCode {
    ko = '한국어',
    en = '영어',
    zh = '중국어',
    ja = '일본어',
    ru = '러시아어',
    fr = '프랑스어',
    es = '스페인어',
    de = '독일어',
}
