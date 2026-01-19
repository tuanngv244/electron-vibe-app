<script setup lang="ts">
// No props needed - static header

const onExport = () => {
  // Placeholder for export functionality
  console.log('Export button clicked');
};
</script>

<template>
  <VCardText class="px-5 py-5">
    <VRow>
      <VCol cols="12" md="6">
        <h2 class="text-h5 mb-1">Human Resource Management</h2>
        <p class="text-body-1 text-medium-emphasis mb-0">
          Manage employee records, certifications, and performance
        </p>
      </VCol>
      <VCol cols="12" md="6" class="d-flex align-center justify-end gap-3">
        <VBtn variant="tonal" prepend-icon="tabler-file-export" @click="onExport"> Export </VBtn>
        <VBtn
          prepend-icon="tabler-plus"
          :to="{
            name: 'nhms-human-resource-details-id',
            params: { id: 'new' },
          }"
        >
          Create
        </VBtn>
      </VCol>
    </VRow>
  </VCardText>
</template>
