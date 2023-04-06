const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('appAPI', {
    setProfile: (data) => ipcRenderer.send('set-profile', data),
});
