import { LANGUAGE_CODES } from '@i18n-editor/shared';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { configCache } from './caches/config.cache';
import { readConfigUI, updateConfigUI } from './handlers/config.ui.handlers';
import { toggleDevTools } from './utils/devtools.utils';
import { addIPCRequestHandler } from './utils/ipc.utils';
import { createWindow } from './utils/window.utils';

console.log(LANGUAGE_CODES);

const setupIpcHandlers = () => {
  addIPCRequestHandler('config:ui:read', readConfigUI);
  addIPCRequestHandler('config:ui:update', updateConfigUI);
};

app.whenReady().then(async () => {
  createWindow();
  await configCache.init();
  setupIpcHandlers();

  if (process.env.NODE_ENV === 'development') {
    globalShortcut.register('F12', () => {
      toggleDevTools();
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
      toggleDevTools();
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
