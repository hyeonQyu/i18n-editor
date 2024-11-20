import { EditorConfig, GetConfigResponse } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { NotFoundError } from '../../defines/errors';
import { getEnvironment } from '../../utils/env';
import { readFile } from '../../utils/file';

const projectRoot = process.cwd();

const env = getEnvironment();

const getConfigFilePath = () => {
  const CONFIG_PATH_BY_ENV: Record<Environment, string> = {
    production: `${projectRoot}/node_modules/i18n-editor/i18n-editor-config.json`,
    development: `${projectRoot}/../../i18n-editor-config.json`,
  };

  return CONFIG_PATH_BY_ENV[env];
};

const configService = {
  async getConfig(): Promise<GetConfigResponse> {
    try {
      const config = (await readFile(getConfigFilePath())) as EditorConfig;

      return {
        config,
      };
    } catch (e) {
      throw new NotFoundError('Config file not found');
    }
  },
};

export default configService;
