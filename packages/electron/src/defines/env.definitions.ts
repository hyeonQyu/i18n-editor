import { OS } from '@i18n-editor/shared';

export type Environment = 'production' | 'development';

export const CMD_BY_OS: Record<
  OS,
  {
    openFileManager: string;
    openUI: string;
  }
> = {
  win: {
    openFileManager: 'explorer',
    openUI: 'start',
  },
  linux: {
    openFileManager: 'xdg-open',
    openUI: 'xdg-open',
  },
  macos: {
    openFileManager: 'open',
    openUI: 'open',
  },
};
