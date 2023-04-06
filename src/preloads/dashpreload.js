const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('appAPI', {
    getProfile:(callback) => ipcRenderer.on('get-profile', callback),
});
