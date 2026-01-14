<script lang="ts" setup>
import { HorizontalNavGroup, HorizontalNavLink } from "@layouts/components";
import type {
  HorizontalNavItems,
  NavGroup,
  NavLink,
  NavSectionTitle,
} from "@layouts/types";
import HorizontalModule from "./HorizontalModule.vue";

const props = defineProps<{
  navItems: HorizontalNavItems;
}>();

const resolveNavItemComponent = (
  item: NavLink | NavGroup | NavSectionTitle
) => {
  if ("children" in item) return HorizontalNavGroup;

  return HorizontalNavLink;
};

const modules = {
  item: {
    title: "Modules",
    icon: {
      icon: "tabler-apps",
    },
    children: [
      {
        title: "PMS Module",
        icon: {
          icon: "tabler-dashboard",
        },
        children: [],
      },
      {
        title: "NHMS Module",
        icon: {
          icon: "tabler-users",
        },
        children: [],
      },
    ],
  },
  isGroupActive: true,
  shouldUseMegaMenu: true,
};
</script>

<template>
  <div class="nav-items">
    <HorizontalModule
      :item="modules.item"
      :is-group-active="modules.isGroupActive"
      :should-use-mega-menu="modules.shouldUseMegaMenu"
      :use-mega-menu="true"
    />
    <div class="divider"></div>
    <ul class="nav-items">
      <Component
        :is="resolveNavItemComponent(item)"
        v-for="(item, index) in navItems"
        :key="index"
        :item="item"
        :use-mega-menu="true"
      />
    </ul>
  </div>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}

.divider {
  background-color: grey;
  width: 2px;
  height: 2rem;
  display: block;
  margin: auto 0.5rem;
}
</style>
