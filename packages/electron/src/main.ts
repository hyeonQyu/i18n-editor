import { app, BrowserWindow, globalShortcut } from 'electron';
import { configCache } from './caches/config.cache';
import { readConfigUI, updateConfigUI } from './handlers/config.ui.handlers';
import { readFileSystemDirectory } from './handlers/fileSystem.directory.handlers';
import { openFileSystemFileManager } from './handlers/fileSystem.fileManager.handlers';
import { readFileSystemInitialPath } from './handlers/fileSystem.initialPath.handlers';
import { toggleDevTools } from './utils/devtools.utils';
import { getEnvironment } from './utils/env.utils';
import { addIPCRequestHandler } from './utils/ipc.utils';
import { createWindow } from './utils/window.utils';

const env = getEnvironment();

const setupIpcHandlers = () => {
  addIPCRequestHandler('config:ui:read', readConfigUI);
  addIPCRequestHandler('config:ui:update', updateConfigUI);

  addIPCRequestHandler('fileSystem:initialPath:read', readFileSystemInitialPath);
  addIPCRequestHandler('fileSystem:directory:read', readFileSystemDirectory);
  addIPCRequestHandler('fileSystem:fileManager:open', openFileSystemFileManager);
};

const registerGlobalShortcuts = () => {
  if (env !== 'development') return;

  globalShortcut.register('F12', () => {
    toggleDevTools();
  });

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    toggleDevTools();
  });
};

app.whenReady().then(async () => {
  createWindow();
  await configCache.init();
  setupIpcHandlers();
  registerGlobalShortcuts();
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
