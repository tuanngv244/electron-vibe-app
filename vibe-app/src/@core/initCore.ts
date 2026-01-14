import { useStorage } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { useConfigStore } from '@core/stores/config'
import { cookieRef, namespaceConfig } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'

const _syncAppRtl = () => {
  const configStore = useConfigStore()
  const storedLang = cookieRef<string | null>('language', null)

  const { locale } = useI18n({ useScope: 'global' })

  // TODO: Handle case where i18n can't read persisted value
  if (locale.value !== storedLang.value && storedLang.value)
    locale.value = storedLang.value

  // watch and change lang attribute of html on language change
  watch(
    locale,
    val => {
      // Update lang attribute of html tag
      if (typeof document !== 'undefined')
        document.documentElement.setAttribute('lang', val as string)

      // Store selected language in cookie
      storedLang.value = val as string

      // set isAppRtl value based on selected language
      if (themeConfig.app.i18n.langConfig && themeConfig.app.i18n.langConfig.length) {
        themeConfig.app.i18n.langConfig.forEach(lang => {
          if (lang.i18nLang === storedLang.value)
            configStore.isAppRTL = lang.isRTL
        })
      }
    },
    { immediate: true },
  )
}

const _handleSkinChanges = () => {
  const { themes } = useTheme()
  const configStore = useConfigStore()

  // Create skin default color so that we can revert back to original (default skin) color when switch to default skin from bordered skin
  Object.values(themes.value).forEach(t => {
    t.colors['skin-default-background'] = t.colors.background
    t.colors['skin-default-surface'] = t.colors.surface
  })

  watch(
    () => configStore.skin,
    val => {
      Object.values(themes.value).forEach(t => {
        t.colors.background = t.colors[`skin-${val}-background`]
        t.colors.surface = t.colors[`skin-${val}-surface`]
      })
    },
    { immediate: true },
  )
}

/*
    ℹ️ Set current theme's surface color in localStorage

    Why? Because when initial loader is shown (before vue is ready) we need to what's the current theme's surface color.
    We will use color stored in localStorage to set the initial loader's background color.

    With this we will be able to show correct background color for the initial loader even before vue identify the current theme.
  */
const _syncInitialLoaderTheme = () => {
  const vuetifyTheme = useTheme()

  watch(
    () => useConfigStore().theme,
    () => {
      // ℹ️ We are not using theme.current.colors.surface because watcher is independent and when this watcher is ran `theme` computed is not updated
      useStorage<string | null>(namespaceConfig('initial-loader-bg'), null).value = vuetifyTheme.current.value.colors.surface
      useStorage<string | null>(namespaceConfig('initial-loader-color'), null).value = vuetifyTheme.current.value.colors.primary
    },
    { immediate: true },
  )
}

const _checkElectronAppUpdated = () => {
  const isElectron = window && window.electronAPI
  if (!isElectron) return

  // Listen for update available event
  window.electronAPI.onUpdateAvailable(() => {
    console.log('🔄 Đang tải bản cập nhật mới...')
    // Có thể hiển thị notification hoặc snackbar ở đây
  })

  // Listen for update downloaded event
  window.electronAPI.onUpdateDownloaded(() => {
    const shouldRestart = confirm('Có phiên bản mới đã được tải về. Bạn có muốn khởi động lại ứng dụng để cập nhật không?')
    if (shouldRestart) {
      window.electronAPI.restartApp()
    }
  })
}

const initCore = () => {
  _syncInitialLoaderTheme()
  _handleSkinChanges()
  // _checkElectronAppUpdated()

  // ℹ️ We don't want to trigger i18n in SK
  if (themeConfig.app.i18n.enable)
    _syncAppRtl()
}

export default initCore
