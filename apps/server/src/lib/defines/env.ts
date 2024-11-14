import { OS } from 'i18n-editor-common';

export type Environment = 'production' | 'development';

export const CMD_BY_OS: Record<
  OS,
  {
    openFileManager: string;
  }
> = {
  win: {
    openFileManager: 'explorer',
  },
  linux: {
    openFileManager: 'xdg-open',
  },
  macos: {
    openFileManager: 'open',
  },
};
