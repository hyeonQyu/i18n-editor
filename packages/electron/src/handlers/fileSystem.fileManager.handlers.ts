import { FileManagerOpenRequest, FileManagerOpenResponse } from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { openFileManager } from '../utils/file.utils';

export const openFileSystemFileManager: IPCHandler<FileManagerOpenResponse, FileManagerOpenRequest> = async (_, { path }) => {
  if (!path) throw new Error('Path is required');
  openFileManager(path);
};
