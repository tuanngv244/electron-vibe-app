<script lang="ts" setup>
import navItems from '@/navigation/horizontal';

import { themeConfig } from '@themeConfig';

// Components
import HorizontalNav from '@/@layouts/components/HorizontalNav.vue';
import Footer from '@/layouts/components/Footer.vue';
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue';
import NavSearchBar from '@/layouts/components/NavSearchBar.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';
import NavBarI18n from '@core/components/I18n.vue';
import { HorizontalNavLayout } from '@layouts';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import NavbarCalendar from './NavbarCalendar.vue';
import NavbarModuleManager from './NavbarModuleManager.vue';
</script>

<template>
  <HorizontalNavLayout class="horizontal-nav-layout" :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink to="/" class="app-logo d-flex align-center gap-x-3">
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
      </RouterLink>
      <!-- <HorizontalNav :nav-items="navItems" /> -->
      <div class="layout-horizontal-nav">
        <div class="horizontal-nav-content-container">
          <HorizontalNav :nav-items="navItems" />
        </div>
      </div>
      <VSpacer />

      <NavSearchBar trigger-btn-class="ms-lg-n3" />
      <!-- <NavbarModuleManager /> -->
      <NavbarCalendar />
      <NavBarI18n
        v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
        :languages="themeConfig.app.i18n.langConfig"
      />

      <NavbarThemeSwitcher />
      <!-- <NavbarShortcuts /> -->
      <NavBarNotifications class="me-2" />
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </HorizontalNavLayout>
</template>

<style lang="css">
.horizontal-nav-layout {
  background: rgba(var(--v-theme-on-background), 0.1);
  backdrop-filter: blur(100px);
  border-radius: 0 24px 0 0;
  overflow-x: hidden;
  margin-right: 36px;
  margin-top: 12px;
  box-shadow:
    rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
}
</style>
