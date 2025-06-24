import { LANGUAGE_CODES } from '@i18n-editor/shared';
import { app, BrowserWindow, dialog, globalShortcut, ipcMain, IpcMainInvokeEvent } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { toggleDevTools } from './utils/devtools';

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
  ipcMain.handle('dialog:openFile', async (): Promise<Electron.OpenDialogReturnValue> => {
    if (!mainWindow) throw new Error('Main window not available');

    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });
    return result;
  });

  ipcMain.handle('dialog:saveFile', async (event: IpcMainInvokeEvent, data: any): Promise<{ success: boolean; filePath?: string }> => {
    if (!mainWindow) throw new Error('Main window not available');

    const result = await dialog.showSaveDialog(mainWindow, {
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (!result.canceled && result.filePath) {
      await writeFile(result.filePath, JSON.stringify(data, null, 2));
      return { success: true, filePath: result.filePath };
    }

    return { success: false };
  });

  ipcMain.handle('app:getVersion', (): string => {
    return app.getVersion();
  });

  ipcMain.handle(
    'fs:readFile',
    async (event: IpcMainInvokeEvent, filePath: string): Promise<{ success: boolean; data?: string; error?: string }> => {
      try {
        const data = await readFile(filePath, 'utf-8');
        return { success: true, data };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    },
  );

  ipcMain.handle(
    'fs:writeFile',
    async (event: IpcMainInvokeEvent, filePath: string, data: string): Promise<{ success: boolean; error?: string }> => {
      try {
        await writeFile(filePath, data, 'utf-8');
        return { success: true };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
    },
  );
};

app.whenReady().then(() => {
  createWindow();
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
