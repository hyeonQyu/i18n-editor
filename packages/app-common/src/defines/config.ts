import { Workspace } from './workspace';

export interface Config {
  workspace: Record<string, Workspace>;
  ui: {
    sidebarOpened: boolean;
  };
}

export const DEFAULT_CONFIG: Config = {
  workspace: {},
  ui: {
    sidebarOpened: false,
  },
};

/**
 * @deprecated
 */
export interface EditorConfig {
  workspaces: Workspace[];
}

export interface ServerConfig {
  port: number;
}

export const DEFAULT_APP_CONFIG: ServerConfig = {
  port: 5252,
};
