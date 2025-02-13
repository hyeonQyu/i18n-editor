import { LanguageCode } from '../../../language';
import { Translation } from '../../../translation';

export interface GetNamespaceRequest {
  id: string;
  namespace: string;
}

export interface GetNamespaceResponse {
  languageCodes: LanguageCode[];
  translations: Translation[];
}

export interface PostNamespaceRequest {
  id: string;
  namespace: string;
}

export type PostNamespaceResponse = void;
