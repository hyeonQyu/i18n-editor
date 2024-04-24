import { LanguageCode } from '../../../language';
import { Translation } from '../../../translation';
import { CommonNamespaceRequest } from './_common';

export * from './language';
export * from './translation';

export interface GetNamespaceRequest extends CommonNamespaceRequest {}

export interface GetNamespaceResponse {
  languageCodes: LanguageCode[];
  translations: Translation[];
}

export interface PostNamespaceRequest extends CommonNamespaceRequest {}

export type PostNamespaceResponse = void;
