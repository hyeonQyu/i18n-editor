import { EditorConfig, GetConfigResponse } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { createService } from '../../utils/createService';
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

const configService = createService({
  async getConfig(): Promise<GetConfigResponse> {
    const config = (await readFile(getConfigFilePath())) as EditorConfig;

    return {
      config,
    };
  },
});

export default configService;
