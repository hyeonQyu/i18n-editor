import { UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '@i18n-editor/shared';
import { configCache } from '../caches/config.cache';
import { IPCHandler } from '../defines/handler.definitions';

export const handleReadConfigUI: IPCHandler<UIReadResponse> = async () => {
  return configCache.getConfig().ui;
};

export const handleUpdateConfigUI: IPCHandler<UIUpdateResponse, UIUpdateRequest> = async (_, request) => {
  await configCache.updatePartialUI(request);
};
