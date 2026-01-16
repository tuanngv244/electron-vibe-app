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

    // Only check for updates in production
    if (process.env.NODE_ENV !== 'development') {
        // electron-builder will use the publish config from package.json
        setTimeout(() => {
            autoUpdater.checkForUpdatesAndNotify();
        }, 3000); // Wait 3 seconds for app to fully load

        // Check for updates every 5 minutes
        setInterval(() => {
            autoUpdater.checkForUpdatesAndNotify();
        }, 5 * 60 * 1000); // 5 minutes
    }
});

// Auto-updater event listeners
autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
    mainWindow?.webContents.send('checking-for-update');
});

autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info);
    mainWindow?.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available:', info);
    mainWindow?.webContents.send('update-not-available', info);
});

autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater:', err);
    mainWindow?.webContents.send('update-error', err.message);
});

autoUpdater.on('download-progress', (progressObj) => {
    log.info('Download progress:', progressObj);
    mainWindow?.webContents.send('download-progress', progressObj);
});

autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded:', info);
    mainWindow?.webContents.send('update-downloaded', info);
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
