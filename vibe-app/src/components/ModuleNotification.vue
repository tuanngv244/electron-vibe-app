<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showNotification = ref(false);
const pendingModulesCount = ref(0);
const isChecking = ref(false);

const checkModuleStatus = async () => {
  if (!window.electronAPI) return;

  isChecking.value = true;
  try {
    const manifest = await window.electronAPI.checkModuleUpdates();
    const installed = await window.electronAPI.getInstalledModules();

    const allModules = Object.keys(manifest.modules || {});
    const notInstalled = allModules.filter((m) => !installed.includes(m));

    console.log("View 🔥 💥", { allModules, installed, notInstalled });

    pendingModulesCount.value = notInstalled.length;

    // Show notification if there are modules to download
    if (notInstalled.length > 0) {
      showNotification.value = true;
    }
  } catch (error) {
    console.error("Failed to check module status:", error);
  } finally {
    isChecking.value = false;
  }
};

const goToModuleManager = () => {
  router.push("/module-manager");
  showNotification.value = false;
};

const dismissNotification = () => {
  showNotification.value = false;
};

onMounted(() => {
  // Check module status on app startup
  setTimeout(checkModuleStatus, 2000);
});
</script>

<template>
  <!-- Floating Action Button -->
  <VBtn
    v-if="pendingModulesCount > 0"
    color="primary"
    icon
    size="large"
    class="module-fab"
    @click="goToModuleManager"
  >
    <VBadge :content="pendingModulesCount" color="error">
      <VIcon icon="mdi-package-variant" />
    </VBadge>
  </VBtn>

  <!-- Notification Snackbar -->
  <VSnackbar
    v-model="showNotification"
    :timeout="-1"
    color="info"
    location="top"
    multi-line
  >
    <div class="d-flex align-center">
      <VIcon icon="mdi-information" class="me-3" />
      <div>
        <div class="text-subtitle-1 font-weight-medium">
          Additional Modules Available
        </div>
        <div class="text-body-2">
          {{ pendingModulesCount }} module{{
            pendingModulesCount > 1 ? "s" : ""
          }}
          ready to download
        </div>
      </div>
    </div>

    <template #actions>
      <VBtn variant="text" @click="dismissNotification"> Later </VBtn>
      <VBtn color="white" variant="text" @click="goToModuleManager">
        Download Now
      </VBtn>
    </template>
  </VSnackbar>
</template>

<style scoped>
.module-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}
</style>
