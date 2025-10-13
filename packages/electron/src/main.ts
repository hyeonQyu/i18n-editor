import { app, BrowserWindow, globalShortcut } from 'electron';
import { configCache } from './caches/config.cache';
import { handleReadConfigUI, handleUpdateConfigUI } from './handlers/config.ui.handlers';
import { readFileSystemDirectory } from './handlers/fileSystem.directory.handlers';
import { handleOpenFileSystemFileManager } from './handlers/fileSystem.fileManager.handlers';
import { handleReadFileSystemInitialPath } from './handlers/fileSystem.initialPath.handlers';
import { handleCreateWorkspace, handleDeleteWorkspace, handleGetAllWorkspaces, handleUpdateWorkspace } from './handlers/workspace.handlers';
import { handleCreateMultipleLanguages, handleDeleteLanguage, handleGetAllLanguages } from './handlers/workspace.language.handlers';
import { handleCreateNamespace, handleDeleteNamespace, handleGetAllNamespaces } from './handlers/workspace.namespace.handlers';
import {
  handleCreateTranslation,
  handleDeleteTranslation,
  handleGetAllTranslations,
  handleUpdateTranslation,
} from './handlers/workspace.translation.handlers';
import { toggleDevTools } from './utils/devtools.utils';
import { getEnvironment } from './utils/env.utils';
import { addIPCRequestHandler } from './utils/ipc.utils';
import { createWindow } from './utils/window.utils';

const env = getEnvironment();

const setupIpcHandlers = () => {
  addIPCRequestHandler('config:ui:read', handleReadConfigUI);
  addIPCRequestHandler('config:ui:update', handleUpdateConfigUI);

  addIPCRequestHandler('fileSystem:initialPath:read', handleReadFileSystemInitialPath);
  addIPCRequestHandler('fileSystem:directory:read', readFileSystemDirectory);
  addIPCRequestHandler('fileSystem:fileManager:open', handleOpenFileSystemFileManager);

  addIPCRequestHandler('workspace:getAll', handleGetAllWorkspaces);
  addIPCRequestHandler('workspace:create', handleCreateWorkspace);
  addIPCRequestHandler('workspace:update', handleUpdateWorkspace);
  addIPCRequestHandler('workspace:delete', handleDeleteWorkspace);

  addIPCRequestHandler('workspace:language:getAll', handleGetAllLanguages);
  addIPCRequestHandler('workspace:language:createMultiple', handleCreateMultipleLanguages);
  addIPCRequestHandler('workspace:language:delete', handleDeleteLanguage);

  addIPCRequestHandler('workspace:namespace:getAll', handleGetAllNamespaces);
  addIPCRequestHandler('workspace:namespace:create', handleCreateNamespace);
  addIPCRequestHandler('workspace:namespace:delete', handleDeleteNamespace);

  addIPCRequestHandler('workspace:translation:getAll', handleGetAllTranslations);
  addIPCRequestHandler('workspace:translation:create', handleCreateTranslation);
  addIPCRequestHandler('workspace:translation:update', handleUpdateTranslation);
  addIPCRequestHandler('workspace:translation:delete', handleDeleteTranslation);
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
  setupIpcHandlers();
  await configCache.init();
  registerGlobalShortcuts();
  createWindow();
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
