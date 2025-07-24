import { LanguageCode, Translation, TranslationKey } from '../defines';
import { NamespaceParams } from './workspace.namespace.models';

export type TranslationParams = NamespaceParams & {
  translationKey: TranslationKey;
};

export type TranslationGetAllRequest = NamespaceParams;

export type TranslationGetAllResponse = {
  translations: Translation[];
};

export type TranslationPositionDirection = 'prev' | 'next';

export type TranslationPosition = {
  pivotTranslationKey: TranslationKey;
  direction: TranslationPositionDirection;
};

export type TranslationCreateRequest = NamespaceParams & {
  position?: TranslationPosition;
  translation: Translation;
};

export type TranslationCreateResponse = void;

export type TranslationUpdateRequest = TranslationParams & {
  languageCode: LanguageCode;
  value: string;
};

export type TranslationUpdateResponse = void;

export type TranslationDeleteRequest = TranslationParams;

export type TranslationDeleteResponse = void;
