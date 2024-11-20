export interface EditorConfig {
  localeDirectoryPath: string;
}

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
