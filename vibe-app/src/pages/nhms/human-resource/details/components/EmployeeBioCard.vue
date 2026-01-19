<script setup lang="ts">
import type { Employee } from '@/types/nhms/human-resource';

interface Props {
  employee: Employee;
}

defineProps<Props>();
</script>

<template>
  <VCard>
    <VCardText class="text-center">
      <VAvatar
        size="120"
        :color="employee.avatar ? undefined : 'primary'"
        :variant="employee.avatar ? undefined : 'tonal'"
        class="mb-4"
      >
        <VImg v-if="employee.avatar" :src="employee.avatar" />
        <span v-else class="text-h3">{{ employee.firstName[0] }}{{ employee.lastName[0] }}</span>
      </VAvatar>

      <h4 class="text-h4 mb-1">
        {{ employee.fullName }}
      </h4>
      <p class="text-body-1 text-medium-emphasis mb-4">
        {{ employee.role }}
      </p>

      <VChip
        :color="employee.status === 'Active' ? 'success' : 'warning'"
        size="small"
        class="mb-6"
      >
        {{ employee.status }}
      </VChip>

      <VDivider class="my-4" />

      <div class="text-start">
        <div class="d-flex align-center mb-3">
          <VIcon icon="tabler-mail" size="20" class="me-3" />
          <span class="text-body-2">{{ employee.email }}</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon icon="tabler-phone" size="20" class="me-3" />
          <span class="text-body-2">{{ employee.phone }}</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon icon="tabler-building" size="20" class="me-3" />
          <span class="text-body-2">{{ employee.department }}</span>
        </div>
        <div class="d-flex align-center">
          <VIcon icon="tabler-calendar" size="20" class="me-3" />
          <span class="text-body-2">{{ employee.shiftType }} Shift</span>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
