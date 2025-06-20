import { contextBridge, ipcRenderer } from 'electron';
// 렌더러 프로세스에서 사용할 API를 안전하게 노출
const electronAPI = {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    saveFile: (data) => ipcRenderer.invoke('dialog:saveFile', data),
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
    writeFile: (filePath, data) => ipcRenderer.invoke('fs:writeFile', filePath, data),
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
