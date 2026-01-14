<script setup lang="ts">
import { ref } from "vue";
import { useModules } from "@/composables/useModules";

const isDialogVisible = ref(false);
const isElectron = window && window.electronAPI;
const { modules, isLoading, error, downloadModule } = useModules();

const formatModuleName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const pendingCount = computed(() => {
  return Object.values(modules.value).filter((m) => !m.installed).length;
});
</script>

<template>
  <div v-show="isElectron">
    <!-- Icon Button in Navbar -->
    <IconBtn @click="isDialogVisible = true">
      <VBadge
        v-if="pendingCount > 0"
        :content="pendingCount"
        color="error"
        offset-x="-2"
        offset-y="-2"
        width="1.125rem"
        height="1.125rem"
        min-width="1.125rem"
      >
        <VIcon icon="tabler-settings" />
      </VBadge>
      <VIcon v-else icon="tabler-settings" />
    </IconBtn>

    <!-- Module Manager Dialog -->
    <VDialog v-model="isDialogVisible" max-width="900" scrollable>
      <VCard>
        <VCardTitle class="d-flex align-center gap-2 pa-4">
          <VIcon icon="mdi-package-variant" size="24" color="primary" />
          <span class="text-h5">Module Manager</span>
          <VSpacer />
          <IconBtn @click="isDialogVisible = false">
            <VIcon icon="tabler-remove" />
          </IconBtn>
        </VCardTitle>

        <VDivider />

        <VCardText class="pa-6" style="max-height: 600px">
          <p class="text-body-1 mb-6">
            Manage and download application modules
          </p>

          <!-- Error Alert -->
          <VAlert
            v-if="error"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
          >
            {{ error }}
          </VAlert>

          <VRow v-if="isLoading">
            <VCol cols="12" class="text-center py-10">
              <VProgressCircular indeterminate color="primary" size="64" />
              <p class="mt-4 text-body-1">Checking for modules...</p>
            </VCol>
          </VRow>

          <VRow v-else>
            <VCol v-for="module in modules" :key="module.name" cols="12" md="6">
              <VCard variant="outlined" class="h-100">
                <VCardText>
                  <div class="d-flex justify-space-between align-center mb-3">
                    <h4 class="text-h6">
                      {{ formatModuleName(module.name) }}
                    </h4>
                    <VChip
                      :color="module.installed ? 'success' : 'warning'"
                      size="small"
                      variant="tonal"
                    >
                      {{ module.installed ? "Installed" : "Not Installed" }}
                    </VChip>
                  </div>

                  <p class="text-caption text-medium-emphasis mb-3">
                    Version: {{ module.version }}
                  </p>

                  <!-- Error message for module -->
                  <VAlert
                    v-if="module.error"
                    type="error"
                    variant="tonal"
                    density="compact"
                    class="mb-3 text-caption"
                  >
                    {{ module.error }}
                  </VAlert>

                  <VProgressLinear
                    v-if="module.downloading"
                    :model-value="module.progress * 100"
                    color="primary"
                    height="6"
                    rounded
                    class="mb-3"
                  />

                  <VBtn
                    v-if="!module.installed && !module.downloading"
                    color="primary"
                    variant="tonal"
                    size="small"
                    block
                    @click="downloadModule(module.name)"
                  >
                    <VIcon icon="mdi-download" start />
                    Download
                  </VBtn>

                  <VBtn
                    v-if="module.downloading"
                    color="warning"
                    variant="tonal"
                    size="small"
                    block
                    disabled
                  >
                    <VProgressCircular
                      indeterminate
                      size="16"
                      width="2"
                      class="me-2"
                    />
                    Downloading... {{ Math.round(module.progress * 100) }}%
                  </VBtn>

                  <VBtn
                    v-if="module.installed"
                    color="success"
                    variant="tonal"
                    size="small"
                    block
                    disabled
                  >
                    <VIcon icon="mdi-check-circle" start />
                    Installed
                  </VBtn>
                </VCardText>
              </VCard>
            </VCol>

            <VCol v-if="Object.keys(modules).length === 0" cols="12">
              <VCard variant="outlined">
                <VCardText class="text-center py-10">
                  <VIcon
                    icon="mdi-package-variant-closed"
                    size="64"
                    color="disabled"
                    class="mb-4"
                  />
                  <p class="text-body-1 text-medium-emphasis">
                    No modules available
                  </p>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
