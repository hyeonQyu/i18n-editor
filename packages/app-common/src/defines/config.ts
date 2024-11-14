export interface EditorConfig {
  localeDirectoryPath: string;
}

export interface ConfigMeta {
  path: string;
}

export interface AppConfig {
  port: number;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  port: 4848,
};
