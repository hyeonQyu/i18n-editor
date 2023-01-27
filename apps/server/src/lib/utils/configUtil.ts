import { Env } from '../defines/appOption';
import { Config, ConfigMeta } from 'i18n-editor-common';
import { FileSystemManager } from './fileSystemManager';

export namespace ConfigUtil {
  const configMeta: ConfigMeta = {
    path: '',
  };

  export function init(env: Env) {
    configMeta.path =
      env === 'production'
        ? `${process.cwd()}/node_modules/i18n-editor/i18n-editor-config.json`
        : `${process.cwd()}/i18n-editor-config.json`;
  }

  export function read(): Config {
    try {
      const config = FileSystemManager.readFile<Config>(configMeta.path);
      console.log('config');
      console.log(config);
      return config;
    } catch (e) {
      console.log(`${configMeta.path} does not exist.`);
      return { localeDirectoryPath: '' };
    }
  }

  export function write(config: Config) {
    try {
      console.log(configMeta.path);
      FileSystemManager.writeFile(configMeta.path, config);
      console.log(`Saved ${configMeta.path} successfully.`);
    } catch (e) {
      throw new Error(`Error occurred during write ${configMeta.path}`);
    }
  }
}
