// Storage wrapper that uses localStorage for Electron and cookies for web
import type { CookieOptions, CookieRef } from './useCookie'
import { useCookie } from './useCookie'

// Detect if running in Electron
const isElectron = () => {
  return navigator.userAgent.toLowerCase().includes('electron')
}

// localStorage-based storage for Electron
const useLocalStorage = <T = string | null | undefined>(name: string): CookieRef<T> => {
  const stored = localStorage.getItem(name)
  const value = ref<T>(stored ? JSON.parse(stored) : null)

  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(name)
    } else {
      localStorage.setItem(name, JSON.stringify(newValue))
    }
  })

  return value as CookieRef<T>
}

/**
 * Universal storage that automatically chooses between cookies (web) and localStorage (Electron)
 * @param name - Storage key name
 * @param opts - Cookie options (only used for web)
 */
export const useAppStorage = <T = string | null | undefined>(
  name: string,
  opts?: CookieOptions<T>
): CookieRef<T> => {
  if (isElectron()) {
    // Use localStorage for Electron
    return useLocalStorage<T>(name)
  } else {
    // Use cookies for web browsers
    return useCookie<T>(name, opts)
  }
}
