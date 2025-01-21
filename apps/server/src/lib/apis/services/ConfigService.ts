import { Config, DEFAULT_CONFIG } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { getEnvironment } from '../../utils/env';
import { readFile, writeFile } from '../../utils/file';

const projectRoot = process.cwd();

const env = getEnvironment();

const CONFIG_DIRECTORY_NAME = '.i18ne';

const FILES = ['workspace'] as const;

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

const refreshConfig = async () => {
  config.workspace = await readFile(getConfigFilePath('workspace'));
};

const initConfig = async () => {
  try {
    await refreshConfig();
  } catch (e) {}
};

const getWorkspace = (): Config['workspace'] => {
  return config.workspace;
};

const setWorkspace = async (workspace: Config['workspace']) => {
  config.workspace = workspace;
  await writeFile(getConfigFilePath('workspace'), workspace);
};

const configService = {
  initConfig,
  refreshConfig,
  getWorkspace,
  setWorkspace,
};

export default configService;
