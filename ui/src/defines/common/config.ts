import { Language } from './translation';

export interface Config {
    localeDirectoryPath: string;
    languages: Language[];
}
