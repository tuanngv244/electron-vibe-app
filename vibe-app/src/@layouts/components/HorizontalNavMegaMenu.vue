<script lang="ts" setup>
import { layoutConfig } from "@layouts";
import { HorizontalNavLink } from "@layouts/components";
import { canViewNavMenuGroup } from "@layouts/plugins/casl";
import { useLayoutConfigStore } from "@layouts/stores/config";
import type { NavGroup } from "@layouts/types";
import { getDynamicI18nProps, isNavGroupActive } from "@layouts/utils";

interface Props {
  item: NavGroup;
}

defineOptions({
  name: "HorizontalNavMegaMenu",
});

const props = defineProps<Props>();

const route = useRoute();
const router = useRouter();
const configStore = useLayoutConfigStore();

const isGroupActive = ref(false);
const hoveredSubmenuIndex = ref<number | null>(null);
const searchQuery = ref("");

const currentRoute = computed(() => route.path);

/*
  Watch for route changes, more specifically route path. Do note that this won't trigger if route's query is updated.

  updates isActive & isOpen based on active state of group.
*/
watch(
  () => route.path,
  () => {
    const isActive = isNavGroupActive(props.item.children, router);

    isGroupActive.value = isActive;
  },
  { immediate: true }
);

const handleSubmenuHover = (index: number) => {
  hoveredSubmenuIndex.value = index;
};

// Auto-select first item on mount
onMounted(() => {
  if (props.item.children.length > 0) {
    hoveredSubmenuIndex.value = 0;
  }
});

// Filtered children based on search (searches both parent and sub-menu items)
const filteredChildren = computed(() => {
  if (!searchQuery.value) return props.item.children;

  const query = searchQuery.value.toLowerCase();
  return props.item.children.filter((child) => {
    // Check if parent title matches
    if (child.title.toLowerCase().includes(query)) {
      return true;
    }

    // Check if any sub-menu item matches
    if ("children" in child && child.children) {
      return child.children.some((subChild) =>
        subChild.title.toLowerCase().includes(query)
      );
    }

    return false;
  });
});
</script>

<template>
  <div
    v-if="canViewNavMenuGroup(item)"
    class="mega-menu-container"
    :class="{ active: isGroupActive }"
  >
    <!-- Left Column: Main Menu Items with Search -->
    <div class="mega-menu-left">
      <!-- Search Bar -->
      <div class="mega-menu-search">
        <VIcon icon="tabler-search" class="search-icon" size="20" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search ⌘K"
          class="search-input"
        />
      </div>

      <!-- Menu Items -->
      <div class="mega-menu-items-wrapper">
        <div
          v-for="(child, index) in filteredChildren"
          :key="child.title"
          class="mega-menu-item"
          :class="{ active: hoveredSubmenuIndex === index  || route.name === ('to' in child ? (child?.to as {name:string})?.name : '') }"
          @mouseenter="handleSubmenuHover(index)"
        >
          <!-- If item has 'to' property, make it a clickable link -->
          <Component
            :is="'to' in child && child.to ? 'RouterLink' : 'div'"
            :to="'to' in child ? child.to : undefined"
            class="mega-menu-item-content"
            :class="{ 'is-link': 'to' in child && child.to }"
          >
            <Component
              :is="layoutConfig.app.iconRenderer || 'div'"
              v-if="child.icon"
              class="nav-item-icon"
              v-bind="child.icon"
            />
            <Component
              :is="layoutConfig.app.i18n.enable ? 'i18n-t' : 'span'"
              v-bind="getDynamicI18nProps(child.title, 'span')"
              class="nav-item-title"
            >
              {{ child.title }}
            </Component>
            <Component
              v-if="
                'children' in child &&
                child.children &&
                child.children.length &&
                !('to' in child && child.to)
              "
              v-bind="layoutConfig.icons.chevronRight"
              :is="layoutConfig.app.iconRenderer || 'div'"
              class="nav-item-arrow"
            />
          </Component>
        </div>
      </div>
    </div>

    <!-- Right Column: Submenu Items -->
    <div class="mega-menu-right">
      <template v-for="(child, index) in filteredChildren" :key="child.title">
        <!-- Only show submenu if item has children and no 'to' property -->
        <div
          v-if="
            'children' in child &&
            child.children &&
            child.children.length &&
            !('to' in child && child.to) &&
            hoveredSubmenuIndex === index
          "
          class="mega-menu-submenu"
        >
          <div class="mega-menu-submenu-title">
            {{ child.title }}
          </div>
          <div class="mega-menu-submenu-items">
            <Component
              :is="'children' in subChild ? 'div' : HorizontalNavLink"
              v-for="subChild in child.children"
              :key="subChild.title"
              :item="subChild"
              class="mega-menu-subitem"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.layout-horizontal-nav {
  .mega-menu-container {
    display: flex;
    min-block-size: 400px;
    background: rgb(var(--v-theme-surface));
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .mega-menu-left {
    min-inline-size: 300px;
    background: rgba(var(--v-theme-on-surface), 0.02);
    border-inline-end: 1px solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    display: flex;
    flex-direction: column;

    .mega-menu-search {
      padding: 12px 16px;
      border-block-end: 1px solid
        rgba(var(--v-border-color), var(--v-border-opacity));
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgb(var(--v-theme-surface));

      .search-icon {
        color: rgba(var(--v-theme-on-surface), 0.5);
        flex-shrink: 0;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;
        color: rgb(var(--v-theme-on-surface));
        font-weight: 500;

        &::placeholder {
          color: rgba(var(--v-theme-on-surface), 0.4);
          font-weight: 400;
        }

        &:focus {
          &::placeholder {
            opacity: 0.7;
          }
        }
      }
    }

    .mega-menu-items-wrapper {
      flex: 1;
      overflow-y: auto;
      padding-block: 12px;

      &::-webkit-scrollbar {
        inline-size: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(var(--v-theme-on-surface), 0.2);
        border-radius: 10px;

        &:hover {
          background: rgba(var(--v-theme-on-surface), 0.3);
        }
      }
    }

    .mega-menu-item {
      padding-block: 14px;
      padding-inline: 16px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;

      &::before {
        content: "";
        position: absolute;
        inset-inline-start: 0;
        inset-block-start: 0;
        block-size: 100%;
        inline-size: 4px;
        background: rgb(var(--v-theme-primary));
        opacity: 0;
        transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover,
      &.active {
        background: rgba(var(--v-theme-primary), 0.12);

        &::before {
          opacity: 1;
        }

        .nav-item-title {
          color: rgb(var(--v-theme-primary));
          font-weight: 600;
        }

        .nav-item-icon {
          color: rgb(var(--v-theme-primary));
        }
      }

      .mega-menu-item-content {
        display: flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
        color: inherit;

        &.is-link {
          cursor: pointer;

          &:hover {
            text-decoration: none;
          }
        }

        .nav-item-icon {
          font-size: 22px;
          flex-shrink: 0;
          color: rgba(var(--v-theme-on-surface), 0.68);
          transition: color 0.25s ease;
        }

        .nav-item-title {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          color: rgb(var(--v-theme-on-surface));
          transition: all 0.25s ease;
        }

        .nav-item-arrow {
          font-size: 20px;
          opacity: 0.5;
          margin-inline-start: auto;
          color: rgba(var(--v-theme-on-surface), 0.68);
        }
      }
    }
  }

  .mega-menu-right {
    flex: 1;
    min-inline-size: 380px;
    max-inline-size: 500px;
    background: rgb(var(--v-theme-surface));
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      inline-size: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(var(--v-theme-on-surface), 0.2);
      border-radius: 10px;

      &:hover {
        background: rgba(var(--v-theme-on-surface), 0.3);
      }
    }
  }

  .mega-menu-right {
    flex: 1;
    min-inline-size: 380px;
    max-inline-size: 500px;
    background: rgb(var(--v-theme-surface));
    overflow-y: auto;

    &::-webkit-scrollbar {
      inline-size: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(var(--v-theme-on-surface), 0.2);
      border-radius: 10px;

      &:hover {
        background: rgba(var(--v-theme-on-surface), 0.3);
      }
    }

    .mega-menu-submenu {
      animation: fadeInUp 0.3s ease;

      .mega-menu-submenu-title {
        font-size: 16px;
        font-weight: 700;
        color: rgb(var(--v-theme-on-surface));
        padding: 12px 16px;
        border-block-end: 1px solid rgba(var(--v-theme-primary), 0.2);
        letter-spacing: 0.2px;
        height: 46px;
      }

      .mega-menu-submenu-items {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 12px 16px;

        .mega-menu-subitem {
          .nav-link a {
            padding-block: 12px;
            padding-inline: 18px;
            border-radius: 4px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            color: rgb(var(--v-theme-on-surface));
            display: flex;
            align-items: center;
            gap: 12px;

            &:hover {
              background: rgba(var(--v-theme-primary), 0.1);
              color: rgb(var(--v-theme-primary));
              transform: translateX(4px);

              .nav-item-icon {
                color: rgb(var(--v-theme-primary));
              }
            }

            &.router-link-active {
              background: rgba(var(--v-theme-primary), 0.16);
              color: rgb(var(--v-theme-primary));
              font-weight: 600;
              box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.2);

              .nav-item-icon {
                color: rgb(var(--v-theme-primary));
              }
            }

            .nav-item-icon {
              font-size: 20px;
              opacity: 0.85;
              color: rgba(var(--v-theme-on-surface), 0.68);
              transition: color 0.25s ease;
            }

            .nav-item-title {
              font-size: 14.5px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
