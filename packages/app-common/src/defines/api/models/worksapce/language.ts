import { LanguageCode } from '../../../language';
import { WorkspaceParams } from './workspace';

export type GetLanguagesParams = WorkspaceParams;

export type GetLanguagesResponse = {
  languageCodes: LanguageCode[];
};

export type PostLanguagesParams = WorkspaceParams;

export interface PostLanguagesRequest {
  languageCodes: LanguageCode[];
}

export type PostLanguagesResponse = void;
