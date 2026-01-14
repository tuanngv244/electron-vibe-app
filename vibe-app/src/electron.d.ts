export interface ElectronAPI {
    send: (channel: string, data: any) => void
    receive: (channel: string, func: (...args: any[]) => void) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
    // Module Manager APIs
    checkModuleUpdates: () => Promise<any>
    getInstalledModules: () => Promise<string[]>
    downloadModule: (moduleName: string) => Promise<boolean>
    onDownloadProgress: (callback: (data: { moduleName: string; progress: number }) => void) => void
}

declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}
