import { ref, computed } from 'vue'
import type { VerticalNavItems } from '@layouts/types'

// Module navigation configs
const moduleNavigations: any = {
    'nhms-module': () => import('@/navigation/vertical/nhms'),
    // 'lms-module': () => import('@/navigation/vertical/lms'),
    // 'pms-module': () => import('@/navigation/vertical/pms'),
}

// Track loaded module navigations
const loadedModules = ref<Set<string>>(new Set())
const dynamicNavItems = ref<VerticalNavItems>([])

export function useDynamicNavigation() {
    const checkAndLoadModuleNav = async () => {
        if (!window.electronAPI) return

        try {
            const installedModules = await window.electronAPI.getInstalledModules()

            for (const moduleName of installedModules) {
                if (!loadedModules.value.has(moduleName) && moduleNavigations[moduleName]) {
                    try {
                        const navModule = await moduleNavigations[moduleName]()
                        const navItems = navModule.default || navModule

                        // Add to dynamic nav items
                        dynamicNavItems.value.push(...navItems)
                        loadedModules.value.add(moduleName)

                        console.log(`✓ Loaded navigation for ${moduleName}`)
                    } catch (error) {
                        console.error(`Failed to load navigation for ${moduleName}:`, error)
                    }
                }
            }
        } catch (error) {
            console.error('Failed to check installed modules:', error)
        }
    }

    const refreshNavigation = () => {
        checkAndLoadModuleNav()
    }

    return {
        dynamicNavItems: computed(() => dynamicNavItems.value),
        loadedModules: computed(() => Array.from(loadedModules.value)),
        refreshNavigation,
        checkAndLoadModuleNav,
    }
}
