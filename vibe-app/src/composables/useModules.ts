import { ref, onMounted } from 'vue'

interface Module {
    name: string
    version: string
    installed: boolean
    downloading: boolean
    progress: number
    error?: string
}

export function useModules() {
    const modules = ref<Record<string, Module>>({})
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const checkForUpdates = async () => {
        if (!window.electronAPI) {
            console.warn('Electron API not available')
            return
        }

        isLoading.value = true
        error.value = null

        try {
            const manifest = await window.electronAPI.checkModuleUpdates()
            const installed = await window.electronAPI.getInstalledModules()

            // Update modules state
            for (const [name, info] of Object.entries(manifest.modules)) {
                modules.value[name] = {
                    name,
                    version: (info as any).version,
                    installed: installed.includes(name),
                    downloading: false,
                    progress: 0,
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to check for module updates'
            console.error('Failed to check for module updates:', err)
            error.value = errorMessage
        } finally {
            isLoading.value = false
        }
    }

    const downloadModule = async (moduleName: string) => {
        if (!modules.value[moduleName]) return

        modules.value[moduleName].downloading = true
        modules.value[moduleName].error = undefined

        console.log('View 🔥 💥', { moduleName });
        try {
            await window.electronAPI.downloadModule(moduleName)
            modules.value[moduleName].installed = true
        } catch (err: any) {
            const errorMessage = err instanceof Error ? err.message : `Failed to download ${moduleName}`
            console.error(`Failed to download ${moduleName}:`, err)
            modules.value[moduleName].error = errorMessage
        } finally {
            modules.value[moduleName].downloading = false
            modules.value[moduleName].progress = 0
        }
    }

    // Listen for download progress
    if (window.electronAPI && window.electronAPI.onDownloadProgress) {
        window.electronAPI.onDownloadProgress((data: { moduleName: string; progress: number }) => {
            if (modules.value[data.moduleName]) {
                modules.value[data.moduleName].progress = data.progress
            }
        })
    }

    onMounted(() => {
        checkForUpdates()
    })

    return {
        modules,
        isLoading,
        error,
        checkForUpdates,
        downloadModule,
    }
}
