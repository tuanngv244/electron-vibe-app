<script lang="ts" setup>
import navItems from '@/navigation/vertical';

// Components
import Footer from '@/layouts/components/Footer.vue';
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue';
import NavSearchBar from '@/layouts/components/NavSearchBar.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';
import NavBarI18n from '@core/components/I18n.vue';
import { themeConfig } from '@themeConfig';
import NavbarCalendar from './NavbarCalendar.vue';
import NavbarModuleManager from './NavbarModuleManager.vue';

// @layouts plugin
import { VerticalNavLayout } from '@layouts';
</script>

<template>
  <VerticalNavLayout class="vertical-nav-layout" :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon size="26" icon="tabler-menu-2" />
        </IconBtn>

        <NavSearchBar class="ms-lg-n3" />

        <VSpacer />

        <NavbarCalendar />
        <!-- <NavbarModuleManager /> -->
        <NavBarI18n
          v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
          :languages="themeConfig.app.i18n.langConfig"
        />
        <NavbarThemeSwitcher />
        <!-- <NavbarShortcuts /> -->
        <NavBarNotifications class="me-1" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>
<style lang="css">
.vertical-nav-layout {
  background: rgba(var(--v-theme-on-background), 0.1);
  backdrop-filter: blur(100px);
  border-radius: 0 24px 0 0;
  overflow-x: hidden;
  margin-right: 36px;
  margin-top: 12px;
}
</style>
