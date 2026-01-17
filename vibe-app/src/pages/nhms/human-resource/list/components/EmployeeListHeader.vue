<script setup lang="ts">
// No props needed - static header
</script>

<template>
  <VCardText>
    <VRow>
      <VCol cols="12" md="6">
        <h2 class="text-h5 mb-2">Human Resource Management</h2>
        <p class="text-body-1 text-medium-emphasis">
          Manage employee records, certifications, and performance
        </p>
      </VCol>
      <VCol cols="12" md="6" class="d-flex align-center justify-end gap-3">
        <VBtn variant="tonal" prepend-icon="tabler-file-export"> Export </VBtn>
        <VBtn
          prepend-icon="tabler-plus"
          :to="{
            name: 'nhms-human-resource-details-id',
            params: { id: 'new' },
          }"
        >
          Add Employee
        </VBtn>
      </VCol>
    </VRow>
  </VCardText>
</template>
