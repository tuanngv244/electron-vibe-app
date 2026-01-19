<script lang="ts" setup>
import { layoutConfig } from '@layouts';
import { useLayoutConfigStore } from '@layouts/stores/config';
import type { NavGroup, NavLink } from '@layouts/types';
import { getDynamicI18nProps, isNavGroupActive } from '@layouts/utils';

interface Props {
  item: NavGroup;
  childrenAtEnd?: boolean;
  isSubItem?: boolean;
  useMegaMenu?: boolean;
}

defineOptions({
  name: 'HorizontalNavGroup',
});

const props = withDefaults(defineProps<Props>(), {
  childrenAtEnd: false,
  isSubItem: false,
  useMegaMenu: false,
});

const route = useRoute();
const router = useRouter();
const configStore = useLayoutConfigStore();

const isGroupActive = ref(false);
const isModalOpen = ref(false);
const hoveredModule = ref<string | null>(null);

watch(
  () => route.path,
  () => {
    const isActive = isNavGroupActive(props.item.children, router);
    isGroupActive.value = isActive;
  },
  { immediate: true }
);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  hoveredModule.value = null;
};

const selectModule = (child: NavLink | NavGroup) => {
  if ('to' in child && child.to) {
    router.push(child.to as any);
    closeModal();
  }
};

const handleMouseEnter = (childTitle: string) => {
  hoveredModule.value = childTitle;
};

const handleMouseLeave = () => {
  hoveredModule.value = null;
};
</script>

<template>
  <li
    class="nav-group nav-module"
    :class="{
      active: isGroupActive,
      disabled: item.disable,
    }"
  >
    <div class="nav-group-label module" @click="openModal">
      <Component
        :is="layoutConfig.app.iconRenderer || 'div'"
        class="nav-item-icon"
        v-bind="item.icon || {}"
      />
      <Component
        :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
        v-bind="getDynamicI18nProps(item.title, 'span')"
        class="nav-item-title"
      >
        {{ item.title }}
      </Component>
    </div>
    <VDialog v-model="isModalOpen" max-width="1200" height="600" @click:outside="closeModal">
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>Select Module</span>
          <VBtn icon variant="text" size="small" @click="closeModal">
            <Component
              :is="layoutConfig.app.iconRenderer || 'div'"
              v-bind="layoutConfig.icons.close || { icon: 'tabler-x' }"
            />
          </VBtn>
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol v-for="child in item.children" :key="child.title" cols="12" sm="6" md="4" lg="3">
              <VCard
                class="module-card"
                :class="{ 'module-card-hovered': hoveredModule === child.title }"
                @mouseenter="handleMouseEnter(child.title)"
                @mouseleave="handleMouseLeave"
                @click="selectModule(child)"
                hover
              >
                <VCardText class="text-center pa-6">
                  <Component
                    :is="layoutConfig.app.iconRenderer || 'div'"
                    class="module-card-icon mb-4"
                    v-bind="child.icon || {}"
                  />
                  <div class="module-card-title">
                    <Component
                      :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
                      v-bind="getDynamicI18nProps(child.title, 'span')"
                    >
                      {{ child.title }}
                    </Component>
                  </div>
                  <div
                    v-if="'badgeContent' in child && child.badgeContent"
                    class="module-card-badge mt-2"
                  >
                    <VBadge :content="child.badgeContent" :color="child.badgeClass" inline />
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </li>
</template>

<style lang="scss">
.layout-horizontal-nav {
  .nav-group {
    .nav-group-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s ease;

      &.module {
        &:hover {
          background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
        }
      }
    }
    &.nav-module {
      list-style: none;
    }
  }
}

.module-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  border: 1px solid rgba(145, 158, 171, 0.2) !important;
  box-shadow:
    rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;

  &:hover,
  &.module-card-hovered {
    border-color: rgb(var(--v-theme-primary)) !important;
    background-color: rgb(var(--v-theme-primary), 0.05);
    border-style: dashed;
  }

  .module-card-icon {
    font-size: 2.5rem;
    color: rgb(var(--v-theme-primary));
  }

  .module-card-title {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  }

  .module-card-badge {
    display: inline-block;
  }
}
</style>
