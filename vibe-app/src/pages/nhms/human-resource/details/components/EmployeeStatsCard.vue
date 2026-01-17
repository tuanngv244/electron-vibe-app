<script setup lang="ts">
import type { Employee } from "@/types/nhms/human-resource";

interface Props {
  employee: Employee;
}

defineProps<Props>();
</script>

<template>
  <VCard>
    <VCardText>
      <h5 class="text-h5 mb-4">Quick Stats</h5>
      <div class="d-flex justify-space-between mb-3">
        <span class="text-body-2">Performance</span>
        <span class="font-weight-medium"
          >{{ employee.performance.rating }}/5.0</span
        >
      </div>
      <div class="d-flex justify-space-between mb-3">
        <span class="text-body-2">Leave Balance</span>
        <span class="font-weight-medium">
          {{
            employee.attendance.totalLeaveDays -
            employee.attendance.usedLeaveDays
          }}
          days
        </span>
      </div>
      <div class="d-flex justify-space-between mb-3">
        <span class="text-body-2">Sick Days</span>
        <span class="font-weight-medium"
          >{{ employee.attendance.sickDays }} days</span
        >
      </div>
      <div class="d-flex justify-space-between">
        <span class="text-body-2">Employee Since</span>
        <span class="font-weight-medium">
          {{ new Date(employee.hireDate).toLocaleDateString() }}
        </span>
      </div>
    </VCardText>
  </VCard>
</template>
