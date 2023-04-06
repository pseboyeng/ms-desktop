const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('appAPI', {
    setVersion: (version) => ipcRenderer.on('set-version', version),
});

