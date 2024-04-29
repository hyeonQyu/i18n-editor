import { Config, ConfigMeta } from 'i18n-editor-common';
import { Environment } from '../../defines/env';
import { createService } from '../../utils/createService';
import { getEnvironment } from '../../utils/env';
import { readFile } from '../../utils/file';

const projectRoot = process.cwd();

const env = getEnvironment();

const CONFIG_PATH_BY_ENV: Record<Environment, string> = {
  production: `${projectRoot}/node_modules/i18n-editor/i18n-editor-config.json`,
  development: `${projectRoot}/../../i18n-editor-config.json`,
};

const CONFIG_META: ConfigMeta = {
  path: CONFIG_PATH_BY_ENV[env],
};

const configService = createService({
  async getConfig() {
    return (await readFile(CONFIG_META.path)) as Config;
  },
});

export default configService;
