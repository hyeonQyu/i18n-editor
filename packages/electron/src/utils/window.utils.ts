import { app, BrowserWindow } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { configCache } from '../caches/config.cache';
import { getEnvironment } from './env.utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

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

export const createWindow = () => {
  const { width, height } = configCache.getConfig().ui.windowSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: join(app.getAppPath(), 'dist/electron/preload.js'),
    },
  });

  const isDev = getEnvironment() === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:4848').catch(() => {
      mainWindow?.loadFile(join(app.getAppPath(), 'dist/renderer/index.html'));
    });
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'dist/renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};
