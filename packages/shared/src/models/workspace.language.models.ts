import { LanguageCode } from '../defines';
import { WorkspaceParams } from './workspace.models';

export type LanguageGetAllRequest = WorkspaceParams;

export type LanguageGetAllResponse = {
  languageCodes: LanguageCode[];
};

export type LanguageCreateMultipleRequest = WorkspaceParams & {
  languageCodes: LanguageCode[];
};

export type LanguageCreateMultipleResponse = void;

export type LanguageDeleteRequest = WorkspaceParams & {
  languageCode: LanguageCode;
};

export type LanguageDeleteResponse = void;
