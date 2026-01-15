import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { ModuleManager } from './modules/ModuleManager';
import { autoUpdater } from 'electron-updater';
import log from "electron-log";

autoUpdater.logger = log;

autoUpdater.logger.info('App starting...');

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
        },
    });

    // Initialize Module Manager (singleton)
    ModuleManager.getInstance();

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173'); // Vue dev server
    } else {
        // In production, load from the packaged files
        const indexPath = path.join(__dirname, '../vibe-app/dist/index.html');
        mainWindow.loadFile(indexPath);
    }

    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    autoUpdater.checkForUpdatesAndNotify();
});

// autoUpdater.set


autoUpdater.on('update-available', () => {
    mainWindow?.webContents.send('update-available')
})

autoUpdater.on('update-downloaded', () => {
    mainWindow?.webContents.send('update-downloaded')
})

// IPC từ Vue để restart app
ipcMain.handle('restart-app', () => {
    autoUpdater.quitAndInstall()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
