export type Environment = 'production' | 'development';

export type OS = 'win' | 'linux' | 'macos';

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
