import { BrowserWindow } from 'electron';

export const toggleDevTools = () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.toggleDevTools();
  }
};
