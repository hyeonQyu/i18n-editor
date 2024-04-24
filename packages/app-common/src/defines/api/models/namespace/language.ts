import { LanguageCode } from '../../../language';
import { CommonNamespaceRequest } from './_common';

export interface PostNamespaceLanguageRequest extends CommonNamespaceRequest {
  languageCodes: LanguageCode[];
}

export interface PostNamespaceLanguageResponse {
  addedLanguageCodes: LanguageCode[];
}

export interface DeleteNamespaceLanguageRequest extends CommonNamespaceRequest {
  languageCode: LanguageCode;
}

export interface DeleteNamespaceLanguageResponse {
  deletedLanguageCode: LanguageCode;
}
