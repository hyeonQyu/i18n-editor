import { Config, DEFAULT_CONFIG } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { readFile, writeFile } from '../../utils/file';
import { getEnvironment } from '../../utils/store';

const projectRoot = process.cwd();

const env = getEnvironment();

const CONFIG_DIRECTORY_NAME = '.i18ne';

const FILES = ['workspace', 'ui'] as const;

type ConfigFileName = typeof FILES[number];

const configDirectoryPath = (() => {
  const CONFIG_PATH_BY_ENV: Record<Environment, string> = {
    production: `${projectRoot}/node_modules/i18n-editor/${CONFIG_DIRECTORY_NAME}`,
    development: `${projectRoot}/../../${CONFIG_DIRECTORY_NAME}`,
  };

  return CONFIG_PATH_BY_ENV[env];
})();

const getConfigFilePath = (fileName: ConfigFileName) => {
  return `${configDirectoryPath}/${fileName}.json`;
};

const config: Config = DEFAULT_CONFIG;

const refresh = async () => {
  config.workspace = await readFile(getConfigFilePath('workspace'));
  config.ui = await readFile(getConfigFilePath('ui'));
};

const init = async () => {
  try {
    await refresh();
  } catch (e) {}
};

const getUI = (): Config['ui'] => {
  return config.ui;
};

const updatePartialUI = async (ui: Partial<Config['ui']>) => {
  config.ui = { ...config.ui, ...ui };
  await writeFile(getConfigFilePath('ui'), config.ui);
};

const getWorkspace = (): Config['workspace'] => {
  return config.workspace;
};

const setWorkspace = async (workspace: Config['workspace']) => {
  config.workspace = workspace;
  await writeFile(getConfigFilePath('workspace'), workspace);
};

const configService = {
  init,
  refresh,
  getUI,
  updatePartialUI,
  getWorkspace,
  setWorkspace,
};

export default configService;
