import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js'),
        },
    });
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile('index.html');
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
function setupIpcHandlers() {
    ipcMain.handle('dialog:openFile', async () => {
        if (!mainWindow)
            throw new Error('Main window not available');
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
                { name: 'All Files', extensions: ['*'] },
            ],
        });
        return result;
    });
    ipcMain.handle('dialog:saveFile', async (event, data) => {
        if (!mainWindow)
            throw new Error('Main window not available');
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
    ipcMain.handle('app:getVersion', () => {
        return app.getVersion();
    });
    ipcMain.handle('fs:readFile', async (event, filePath) => {
        try {
            const data = await readFile(filePath, 'utf-8');
            return { success: true, data };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    });
    ipcMain.handle('fs:writeFile', async (event, filePath, data) => {
        try {
            await writeFile(filePath, data, 'utf-8');
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        }
    });
}
app.whenReady().then(() => {
    createWindow();
    setupIpcHandlers();
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
