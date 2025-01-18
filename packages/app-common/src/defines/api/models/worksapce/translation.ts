import { LanguageCode } from '../../../language';
import { Translation } from '../../../translation';
import { NamespaceParams } from './namespace';

export type PostTranslationParams = NamespaceParams;

export interface PostTranslationRequest {
  index: number;
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
