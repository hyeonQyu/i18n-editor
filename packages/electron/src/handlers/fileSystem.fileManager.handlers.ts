import { FileManagerOpenRequest, FileManagerOpenResponse, InvalidRequestError } from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { openFileManager } from '../utils/file.utils';

export const handleOpenFileSystemFileManager: IPCHandler<FileManagerOpenResponse, FileManagerOpenRequest> = async (_, { path }) => {
  if (!path) throw new InvalidRequestError('Path is required');
  openFileManager(path);
};
