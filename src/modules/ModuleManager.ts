import { app, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as crypto from 'crypto';
import AdmZip from 'adm-zip';

export interface ModuleManifest {
    modules: {
        [key: string]: {
            version: string;
            url: string;
            size: number;
            checksum: string;
        };
    };
}

export class ModuleManager {
    private static instance: ModuleManager | null = null;
    private userDataPath: string;
    private modulesPath: string;
    private manifestPath: string;
    private static handlersRegistered = false;

    private constructor() {
        this.userDataPath = app.getPath('userData');
        this.modulesPath = path.join(this.userDataPath, 'modules');
        this.manifestPath = path.join(this.userDataPath, 'manifest.json');

        this.ensureDirectories();
        this.setupIPC();
    }

    public static getInstance(): ModuleManager {
        if (!ModuleManager.instance) {
            ModuleManager.instance = new ModuleManager();
        }
        return ModuleManager.instance;
    }

    private ensureDirectories() {
        if (!fs.existsSync(this.modulesPath)) {
            fs.mkdirSync(this.modulesPath, { recursive: true });
        }

        const tempPath = path.join(this.userDataPath, 'temp');
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true });
        }
    }

    private setupIPC() {
        // Only register handlers once
        if (ModuleManager.handlersRegistered) {
            return;
        }

        ipcMain.handle('modules:check-updates', async () => {
            return await this.checkForUpdates();
        });

        ipcMain.handle('modules:download', async (event, moduleName: string) => {
            return await this.downloadModule(moduleName, (progress) => {
                event.sender.send('modules:download-progress', {
                    moduleName,
                    progress,
                });
            });
        });

        ipcMain.handle('modules:get-installed', async () => {
            return this.getInstalledModules();
        });

        ModuleManager.handlersRegistered = true;
    }

    async checkForUpdates(): Promise<ModuleManifest> {
        const serverManifest = await this.fetchServerManifest();
        const localManifest = this.getLocalManifest();

        // Compare versions and return updates needed
        return serverManifest;
    }

    private async fetchServerManifest(): Promise<ModuleManifest> {
        // In development, use local test manifest
        const isDevelopment = process.env.NODE_ENV === 'development';
        if (true) {
            const testManifestPath = path.join(app.getAppPath(), 'test-manifest.json');
            if (fs.existsSync(testManifestPath)) {
                return JSON.parse(fs.readFileSync(testManifestPath, 'utf-8'));
            }
        }

        const manifestUrl = 'https://your-server.com/api/modules/manifest.json';

        return new Promise((resolve, reject) => {
            https
                .get(manifestUrl, (res) => {
                    let data = '';
                    res.on('data', (chunk) => (data += chunk));
                    res.on('end', () => {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            reject(error);
                        }
                    });
                })
                .on('error', reject);
        });
    }

    private getLocalManifest(): ModuleManifest {
        if (fs.existsSync(this.manifestPath)) {
            return JSON.parse(fs.readFileSync(this.manifestPath, 'utf-8'));
        }
        return { modules: {} };
    }

    async downloadModule(
        moduleName: string,
        onProgress: (progress: number) => void
    ): Promise<boolean> {
        const manifest = await this.fetchServerManifest();
        const moduleInfo = manifest.modules[moduleName];

        if (!moduleInfo) {
            throw new Error(`Module ${moduleName} not found`);
        }

        const tempPath = path.join(this.userDataPath, 'temp', `${moduleName}.zip`);
        const modulePath = path.join(this.modulesPath, moduleName);

        try {
            // Download
            await this.downloadFile(moduleInfo.url, tempPath, onProgress);

            // Verify checksum
            const isValid = await this.verifyChecksum(tempPath, moduleInfo.checksum);
            if (!isValid) {
                fs.unlinkSync(tempPath);
                throw new Error('Checksum verification failed');
            }

            // Extract
            const zip = new AdmZip(tempPath);
            zip.extractAllTo(modulePath, true);

            // Cleanup
            fs.unlinkSync(tempPath);

            // Update local manifest
            this.updateLocalManifest(moduleName, moduleInfo.version);

            return true;
        } catch (error) {
            // Cleanup on error
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
            throw error;
        }
    }

    private downloadFile(
        url: string,
        dest: string,
        onProgress: (progress: number) => void
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const dir = path.dirname(dest);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Handle file:// protocol for local testing
            if (url.startsWith('file://')) {
                const sourcePath = url.replace('file://', '');

                try {
                    // Simulate download progress for local files
                    const sourceBuffer = fs.readFileSync(sourcePath);
                    const total = sourceBuffer.length;
                    const chunkSize = Math.max(1024, Math.floor(total / 10)); // 10 progress updates

                    let written = 0;
                    const writeStream = fs.createWriteStream(dest);

                    const writeChunk = () => {
                        if (written >= total) {
                            writeStream.end();
                            onProgress(1);
                            resolve();
                            return;
                        }

                        const end = Math.min(written + chunkSize, total);
                        const chunk = sourceBuffer.slice(written, end);
                        writeStream.write(chunk);
                        written = end;
                        onProgress(written / total);

                        // Simulate network delay
                        setTimeout(writeChunk, 100);
                    };

                    writeChunk();
                } catch (err) {
                    if (fs.existsSync(dest)) {
                        fs.unlinkSync(dest);
                    }
                    reject(err);
                }
                return;
            }

            // Handle HTTPS URLs
            const file = fs.createWriteStream(dest);

            https
                .get(url, (res) => {
                    const total = Number(res.headers['content-length']);
                    let downloaded = 0;

                    res.on('data', (chunk) => {
                        downloaded += chunk.length;
                        onProgress(downloaded / total);
                    });

                    res.pipe(file);

                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                })
                .on('error', (err) => {
                    if (fs.existsSync(dest)) {
                        fs.unlinkSync(dest);
                    }
                    reject(err);
                });
        });
    }

    private async verifyChecksum(
        filePath: string,
        expectedChecksum: string
    ): Promise<boolean> {
        const hash = crypto.createHash('sha256');
        const fileBuffer = fs.readFileSync(filePath);
        hash.update(fileBuffer);
        const fileChecksum = hash.digest('hex');
        return fileChecksum === expectedChecksum;
    }

    private updateLocalManifest(moduleName: string, version: string) {
        const manifest = this.getLocalManifest();
        if (!manifest.modules[moduleName]) {
            manifest.modules[moduleName] = {
                version,
                url: '',
                size: 0,
                checksum: '',
            };
        }
        manifest.modules[moduleName].version = version;
        fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2));
    }

    getInstalledModules(): string[] {
        const manifest = this.getLocalManifest();
        return Object.keys(manifest.modules);
    }

    getModulePath(moduleName: string): string {
        return path.join(this.modulesPath, moduleName);
    }
}
