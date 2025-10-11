import { OS } from '@i18n-editor/shared';
import os from 'os';
import { Environment } from '../defines/env.definitions';

export const getOS = () => os.platform().toLowerCase().replace(/[0-9]/g, '').replace('darwin', 'macos') as OS;

export const getEnvironment = (): Environment => {
  if (process.resourcesPath) {
    return 'production';
  }

  return 'development';
};
