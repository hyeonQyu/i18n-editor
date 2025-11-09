import { Config, getDefaultConfig } from '@i18n-editor/shared';
import { app } from 'electron';
import path from 'path';
import { Environment } from '../defines/env.definitions';
import { getEnvironment, getOS } from '../utils/env.utils';
import { createFileWhenNotExist, readFile, writeFile } from '../utils/file.utils';

const projectRoot = process.cwd();

const env = getEnvironment();

const CONFIG_DIRECTORY_NAME = '.i18ne';

const FILES = ['workspace', 'ui', 'editor'] as const;

type ConfigFileName = (typeof FILES)[number];

const configDirectoryPath = (() => {
  const CONFIG_PATH_BY_ENV: Record<Environment, string> = {
    production: path.join(app.getPath('userData'), CONFIG_DIRECTORY_NAME),
    development: `${projectRoot}/../../${CONFIG_DIRECTORY_NAME}`,
  };

  return CONFIG_PATH_BY_ENV[env];
})();

const getConfigFilePath = (fileName: ConfigFileName) => {
  return `${configDirectoryPath}/${fileName}.json`;
};

const writeConfigFile = async (fileName: ConfigFileName) => {
  await writeFile(getConfigFilePath(fileName), config[fileName]);
};

const DEFAULT_CONFIG = getDefaultConfig(getOS());
const config: Config = { ...DEFAULT_CONFIG };

const getPartialConfigUpdater =
  <T extends ConfigFileName>(fileName: T) =>
  async (partialConfig: Partial<Config[T]>) => {
    config[fileName] = {
      ...config[fileName],
      ...partialConfig,
    };

    await writeConfigFile(fileName);
  };

export const configCache = {
  init: async () => {
    await Promise.all(FILES.map((fileName) => createFileWhenNotExist(getConfigFilePath(fileName), DEFAULT_CONFIG[fileName])));
    const [workspace, ui, editor] = await Promise.all(FILES.map((fileName) => readFile(getConfigFilePath(fileName))));

    config.workspace = workspace;
    config.ui = {
      ...DEFAULT_CONFIG.ui,
      ...ui,
    };
    config.editor = {
      ...DEFAULT_CONFIG.editor,
      ...editor,
    };

    await writeConfigFile('ui');
    await writeConfigFile('editor');
  },

  getConfig: () => config,

  updatePartialUI: getPartialConfigUpdater('ui'),

  updatePartialEditor: getPartialConfigUpdater('editor'),

  updateWorkspace: async (workspace: Config['workspace']) => {
    config.workspace = workspace;
    await writeConfigFile('workspace');
  },
};
