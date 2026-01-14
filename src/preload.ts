import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    send: (channel: string, data: any) => {
        // Whitelist channels
        const validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel: string, func: (...args: any[]) => void) => {
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    invoke: (channel: string, ...args: any[]) => {
        const validChannels = ['ping'];
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, ...args);
        }
    },
    // Module Manager APIs
    checkModuleUpdates: () => ipcRenderer.invoke('modules:check-updates'),
    getInstalledModules: () => ipcRenderer.invoke('modules:get-installed'),
    downloadModule: (moduleName: string) => ipcRenderer.invoke('modules:download', moduleName),
    onDownloadProgress: (callback: (data: { moduleName: string; progress: number }) => void) => {
        ipcRenderer.on('modules:download-progress', (_, data) => callback(data));
    },

    onUpdateAvailable: (callback: () => void) => {
        ipcRenderer.on('update-available', callback)
    },
    onUpdateDownloaded: (callback: () => void) => {
        ipcRenderer.on('update-downloaded', callback)
    },
    restartApp: () => ipcRenderer.invoke('restart-app')
});
