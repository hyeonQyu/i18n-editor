import { LanguageCode } from '../../../language';
import { Translation, TranslationKey } from '../../../translation';
import { NamespaceParams } from './namespace';

export type GetTranslationsParams = NamespaceParams;

export type GetTranslationsResponse = {
  translations: Translation[];
};

export type PostTranslationParams = NamespaceParams;

export type TranslationPosition = {
  pivotTranslationKey: TranslationKey;
  direction: -1 | 1;
};

export interface PostTranslationRequest {
  position: TranslationPosition;
  translation: Translation;
}

export type PostTranslationResponse = void;

export type TranslationParams = PostTranslationParams & {
  translationKey: string;
};

export type PutTranslationParams = TranslationParams;

export interface PutTranslationRequest {
  languageCode: LanguageCode;
  value: string;
}

export type PutTranslationResponse = void;

export type DeleteTranslationParams = TranslationParams;

export type DeleteTranslationResponse = void;
