import { DEFAULT_EDITOR_CONFIG, EditorConfig, Workspace } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { getEnvironment } from '../../utils/env';
import { readFile, writeFile } from '../../utils/file';

const projectRoot = process.cwd();

const env = getEnvironment();

const getConfigFilePath = () => {
  const CONFIG_PATH_BY_ENV: Record<Environment, string> = {
    production: `${projectRoot}/node_modules/i18n-editor/i18n-editor-config.json`,
    development: `${projectRoot}/../../i18n-editor-config.json`,
  };

  return CONFIG_PATH_BY_ENV[env];
};

let editorConfig = DEFAULT_EDITOR_CONFIG;

const readConfig = async () => {
  return (await readFile(getConfigFilePath())) as EditorConfig;
};

const writeConfig = async (config: EditorConfig) => {
  return await writeFile(getConfigFilePath(), config);
};

const refreshConfig = async () => {
  editorConfig = await readConfig();
};

const getConfig = () => editorConfig;

const initConfig = async () => {
  try {
    await refreshConfig();
  } catch (e) {
    editorConfig = DEFAULT_EDITOR_CONFIG;
  }
};

const setWorkspaces = async (workspaces: Workspace[]) => {
  editorConfig.workspaces = workspaces;
  await writeConfig(editorConfig);
};

const configService = {
  initConfig,
  getConfig,
  refreshConfig,
  setWorkspaces,
};

export default configService;
