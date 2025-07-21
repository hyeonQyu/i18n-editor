import { UIReadResponse, UIUpdateRequest, UIUpdateResponse } from '@i18n-editor/shared/models/config.ui.models.js';
import { configCache } from '../caches/config.cache';
import { IPCHandler } from '../defines/handler.definitions';

export const readConfigUI: IPCHandler<UIReadResponse> = async () => {
  return configCache.getConfig().ui;
};

export const updateConfigUI: IPCHandler<UIUpdateResponse, UIUpdateRequest> = async (_, request) => {
  await configCache.updatePartialUI(request);
};
