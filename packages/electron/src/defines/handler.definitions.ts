import { APICall, WithExtraArgs } from '@i18n-editor/shared';
import { IpcMainInvokeEvent } from 'electron';

export type IPCHandler<TResponse, TRequest = void> = WithExtraArgs<APICall<TResponse, TRequest>, [IpcMainInvokeEvent]>;
