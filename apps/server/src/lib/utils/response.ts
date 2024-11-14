import { Express } from 'express';
import ConfigController from '../apis/controllers/ConfigController';
import FileSystemController from '../apis/controllers/FileSystemController';
import NamespaceController from '../apis/controllers/NamespaceController';
import BaseController from './BaseController';

const CONTROLLER_MAP = {
  config: {
    path: '/config',
    constructor: ConfigController,
  },
  fileSystem: {
    path: '/file-system',
    constructor: FileSystemController,
  },
  namespace: {
    path: '/namespace',
    constructor: NamespaceController,
  },
} as const satisfies Record<
  string,
  {
    path: string;
    constructor: typeof BaseController;
  }
>;

export const startResponse = (server: Express) => {
  Object.values(CONTROLLER_MAP).forEach(({ path, constructor }) => {
    new constructor(path, server).start();
  });
};
