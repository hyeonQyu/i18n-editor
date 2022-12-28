export interface DirectoryEntry {
  name: string;
  type: DirectoryEntryType;
}

export type DirectoryEntryType = 'directory' | 'file' | 'unknown';
