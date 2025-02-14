import { LanguageCode } from '../../../language';
import { Translation } from '../../../translation';

export interface NamespaceParams {
  id: string;
  namespace: string;
}

export type GetNamespaceParams = NamespaceParams;

export interface GetNamespaceResponse {
  languageCodes: LanguageCode[];
  translations: Translation[];
}

export type PostNamespaceParams = Pick<NamespaceParams, 'id'>;

export type PostNamespaceRequest = Pick<NamespaceParams, 'namespace'>;

export type PostNamespaceResponse = void;
