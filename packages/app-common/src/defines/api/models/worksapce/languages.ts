import { LanguageCode } from '../../../language';
import { WorkspaceParams } from './workspace';

export type PostLanguageCodesParams = WorkspaceParams;

export interface PostLanguageCodesRequest {
  languageCodes: LanguageCode[];
}

export type PostLanguageCodesResponse = void;
