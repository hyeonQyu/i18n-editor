import { Workspace } from './workspace';

export interface Config {
  workspace: Record<string, Workspace>;
}

export const DEFAULT_CONFIG: Config = {
  workspace: {},
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
