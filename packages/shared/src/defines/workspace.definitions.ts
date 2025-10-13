import { LanguageCode } from './language.definitions';

export interface Workspace {
  id: string;
  name: string;
  path: string;
  defaultLanguage?: LanguageCode;
  lastOpenedAt: number;
}
