<script setup lang="ts">
//
</script>

<template>
  <VContainer>
    <VCard class="text-center pa-10">
      <VIcon icon="mdi-package-down" size="64" color="warning" class="mb-4" />
      <h2 class="mb-4">Module Not Installed</h2>
      <p class="mb-6">
        This module is not yet installed. Please download it to access this
        feature.
      </p>
      <VBtn color="primary" to="/module-manager"> Go to Module Manager </VBtn>
    </VCard>
  </VContainer>
</template>
