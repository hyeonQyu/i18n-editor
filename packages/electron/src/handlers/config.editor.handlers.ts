import { EditorReadResponse, EditorUpdateRequest, EditorUpdateResponse } from '@i18n-editor/shared';
import { configCache } from '../caches/config.cache';
import { IPCHandler } from '../defines/handler.definitions';

export const handleReadConfigEditor: IPCHandler<EditorReadResponse> = async () => {
  return configCache.getConfig().editor;
};

export const handleUpdateConfigEditor: IPCHandler<EditorUpdateResponse, EditorUpdateRequest> = async (_, request) => {
  await configCache.updatePartialEditor(request);
};
