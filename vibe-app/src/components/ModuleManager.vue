<template>
  <VCard>
    <VCardText>
      <VRow v-if="isLoading">
        <VCol cols="12" class="text-center">
          <VProgressCircular indeterminate color="primary" />
          <p class="mt-4">Checking for modules...</p>
        </VCol>
      </VRow>

      <VAlert v-if="error" type="error" variant="tonal" class="mb-4">
        {{ error }}
      </VAlert>

      <VRow v-if="!isLoading">
        <VCol v-for="module in modules" :key="module.name" cols="12" md="6">
          <VCard variant="outlined">
            <VCardText>
              <div class="d-flex justify-space-between align-center mb-2">
                <h3 class="text-h6">{{ formatModuleName(module.name) }}</h3>
                <VChip
                  :color="module.installed ? 'success' : 'warning'"
                  size="small"
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
</template>

<script setup lang="ts">
import { useModules } from "@/composables/useModules";

const { modules, isLoading, error, downloadModule } = useModules();

const formatModuleName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>
