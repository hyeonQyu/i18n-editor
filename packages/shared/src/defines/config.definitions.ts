import { Workspace } from './workspace.definitions';

export interface Config {
  workspace: Record<string, Workspace>;
  ui: {
    sidebarOpened: boolean;
    windowSize: {
      width: number;
      height: number;
    };
    themeMode: 'light' | 'dark' | undefined;
  };
}

export const DEFAULT_CONFIG: Config = {
  workspace: {},
  ui: {
    sidebarOpened: true,
    windowSize: {
      width: 1200,
      height: 800,
    },
    themeMode: undefined,
  },
};
