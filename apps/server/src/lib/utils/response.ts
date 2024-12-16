import { Express } from 'express';
import ConfigController from '../apis/controllers/ConfigController';
import FileSystemController from '../apis/controllers/FileSystemController';
import NamespaceController from '../apis/controllers/NamespaceController';
import WorkspaceController from '../apis/controllers/WorkspaceController';
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
  workspace: {
    path: '/workspace',
    constructor: WorkspaceController,
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

export const startResponse = async (server: Express) => {
  for (const { path, constructor } of Object.values(CONTROLLER_MAP)) {
    await new constructor(path, server).start();
  }
};
