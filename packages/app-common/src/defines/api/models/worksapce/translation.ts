import { Translation } from '../../../translation';
import { NamespaceParams } from './namespace';

export type PostTranslationParams = NamespaceParams;

export interface PostTranslationRequest {
  index: number;
  translation: Translation;
}

export type PostTranslationResponse = void;
