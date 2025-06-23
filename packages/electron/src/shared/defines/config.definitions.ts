import { Workspace } from './workspace.definitions';

export interface Config {
  workspace: Record<string, Workspace>;
  ui: {
    sidebarOpened: boolean;
  };
}

export const DEFAULT_CONFIG: Config = {
  workspace: {},
  ui: {
    sidebarOpened: true,
  },
};
