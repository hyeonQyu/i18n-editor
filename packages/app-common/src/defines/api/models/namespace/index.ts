import { LanguageCode } from '../../../language';
import { Translation } from '../../../translation';
import { CommonNamespaceRequest } from './_common';

export * from './language';
export * from './translation';
export * from './_common';

/**
 * @deprecated
 */
export interface GetNamespaceRequest1 extends CommonNamespaceRequest {}

/**
 * @deprecated
 */
export interface GetNamespaceResponse1 {
  languageCodes: LanguageCode[];
  translations: Translation[];
}

/**
 * @deprecated
 */
export interface PostNamespaceRequest1 extends CommonNamespaceRequest {}

/**
 * @deprecated
 */
export type PostNamespaceResponse1 = void;
