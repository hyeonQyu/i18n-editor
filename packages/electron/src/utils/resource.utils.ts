import { app } from 'electron';
import { join } from 'path';
import { getEnvironment } from './env.utils';

type AppType = 'electron' | 'renderer';

const isDev = getEnvironment() === 'development';

export const getResourcePath = (appType: AppType, relativePath: string) => {
  if (!isDev) {
    return join(app.getAppPath(), `dist/${appType}`, relativePath);
  }

  if (appType === 'electron') {
    return join(app.getAppPath(), relativePath);
  } else if (appType === 'renderer') {
    return join(app.getAppPath(), '../renderer/', relativePath);
  }

  return join(app.getAppPath(), '../', relativePath);
};
