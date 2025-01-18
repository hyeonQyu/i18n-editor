import { Workspace } from './workspace';

export interface EditorConfig {
  workspaces: Workspace[];
}

export const DEFAULT_EDITOR_CONFIG: EditorConfig = {
  workspaces: [],
};

/**
 * @deprecated
 */
export interface ConfigMeta {
  path: string;
}

export interface ServerConfig {
  port: number;
}

export const DEFAULT_APP_CONFIG: ServerConfig = {
  port: 5252,
};
