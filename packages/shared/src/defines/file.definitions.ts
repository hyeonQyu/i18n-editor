export interface FileEntry {
  name: string;
  type: FileEntryType;
}

export type FileEntryType = 'directory' | 'file' | 'unknown';

export const EXTENSIONS_SUFFIX = {
  json: '.json',
};
