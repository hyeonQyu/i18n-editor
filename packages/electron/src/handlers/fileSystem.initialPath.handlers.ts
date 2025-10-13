import { InitialPathReadResponse } from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { getCurrentWorkingDirectory } from '../utils/file.utils';

export const handleReadFileSystemInitialPath: IPCHandler<InitialPathReadResponse> = async () => {
  return {
    path: getCurrentWorkingDirectory(),
  };
};
