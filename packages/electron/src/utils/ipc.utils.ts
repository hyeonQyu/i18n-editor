import { ElectronAPIPath } from '@i18n-editor/shared';
import { ipcMain } from 'electron';
import { IPCHandler } from '../defines/handler.definitions';

export const addIPCRequestHandler = <TResponse, TRequest = void>(path: ElectronAPIPath, handler: IPCHandler<TResponse, TRequest>) => {
  return ipcMain.handle(path, handler);
};
