import { LanguageCode } from './language.definitions';
import { KeyValuePair } from './utils.definitions';

export type TranslationKey = string;
export type TranslationValue = string;

export type TranslationValueByLanguageCode = Partial<Record<LanguageCode, TranslationValue>>;

export type NamespaceContent = Record<TranslationKey, TranslationValue>;

export type Translation = KeyValuePair<TranslationKey, TranslationValueByLanguageCode>;
