import { LanguageCode } from './language';

type TranslationKey = string;
type TranslationValue = string;

export type Translation = Record<TranslationKey, Record<LanguageCode, TranslationValue>>;
