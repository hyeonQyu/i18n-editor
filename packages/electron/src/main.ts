import { LANGUAGE_CODES } from '@i18n-editor/shared';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { configCache } from './caches/config.cache';
import { readConfigUI, updateConfigUI } from './handlers/config.ui.handlers';
import { toggleDevTools } from './utils/devtools.utils';
import { addIPCRequestHandler } from './utils/ipc.utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

console.log(LANGUAGE_CODES);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

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
