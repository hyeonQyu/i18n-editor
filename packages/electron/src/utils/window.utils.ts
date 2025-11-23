import { app, BrowserWindow } from 'electron';
import { configCache } from '../caches/config.cache';
import { getEnvironment } from './env.utils';
import { getResourcePath } from './resource.utils';

const isDev = getEnvironment() === 'development';

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
      preload: getResourcePath('electron', 'preload.js'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4848').catch(() => {
      mainWindow?.loadFile(getResourcePath('renderer', 'index.html'));
    });
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(getResourcePath('renderer', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};
