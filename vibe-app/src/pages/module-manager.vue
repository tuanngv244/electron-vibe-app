<script setup lang="ts">
import ModuleManager from "@/components/ModuleManager.vue";

definePage({
  meta: {
    layout: "blank",
  },
});
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="900" width="100%">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <VIcon icon="mdi-package-variant" size="30" color="primary" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Module Manager
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="mb-0">Manage and download application modules</p>
      </VCardText>

      <VCardText>
        <ModuleManager />
      </VCardText>

      <VCardText class="text-center">
        <VBtn to="/" variant="text"> Back to Home </VBtn>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/template/pages/page-auth.scss";
</style>
