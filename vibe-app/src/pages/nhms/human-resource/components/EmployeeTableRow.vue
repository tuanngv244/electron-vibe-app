<script setup lang="ts">
import type { Employee } from "@/types/nhms/human-resource";
import { STATUS_VARIANT_MAP, EMPLOYEE_TYPE_COLOR_MAP } from "../consts";

interface Props {
  employee: Employee;
}

interface Emits {
  (e: "delete", id: number): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <tr>
    <td>
      <div class="d-flex align-center gap-3 py-3">
        <VAvatar
          :size="38"
          :color="employee.avatar ? undefined : 'primary'"
          :variant="employee.avatar ? undefined : 'tonal'"
        >
          <VImg v-if="employee.avatar" :src="employee.avatar" />
          <span v-else
            >{{ employee.firstName[0] }}{{ employee.lastName[0] }}</span
          >
        </VAvatar>
        <div>
          <h6 class="text-h6 font-weight-medium">
            {{ employee.fullName }}
          </h6>
          <span class="text-xs text-medium-emphasis"
            >ID: {{ employee.employeeId }}</span
          >
        </div>
      </div>
    </td>
    <td>
      <div class="d-flex flex-column gap-1">
        <span class="text-body-2">{{ employee.email }}</span>
        <span class="text-xs text-medium-emphasis">{{ employee.phone }}</span>
      </div>
    </td>
    <td>
      <div class="d-flex flex-column gap-1">
        <span class="font-weight-medium">{{ employee.role }}</span>
        <span class="text-xs text-medium-emphasis">{{
          employee.department
        }}</span>
      </div>
    </td>
    <td>
      <div class="d-flex flex-column gap-1">
        <VChip
          :color="EMPLOYEE_TYPE_COLOR_MAP[employee.employeeType]"
          size="x-small"
        >
          {{ employee.employeeType }}
        </VChip>
        <span class="text-xs text-medium-emphasis"
          >{{ employee.shiftType }} Shift</span
        >
      </div>
    </td>
    <td>
      <VChip :color="STATUS_VARIANT_MAP[employee.status]" size="small">
        {{ employee.status }}
      </VChip>
    </td>
    <td>
      <div class="d-flex align-center gap-2">
        <VRating
          :model-value="employee.performance.rating"
          readonly
          density="compact"
          size="small"
          color="warning"
        />
        <span class="text-body-2 font-weight-medium">{{
          employee.performance.rating
        }}</span>
      </div>
    </td>
    <td>
      <div class="d-flex gap-1">
        <VBtn
          icon
          variant="text"
          size="small"
          :to="{
            name: 'nhms-human-resource-details-id',
            params: { id: employee.id },
          }"
        >
          <VIcon icon="tabler-eye" />
          <VTooltip activator="parent" location="top"> View Details </VTooltip>
        </VBtn>
        <VBtn
          icon
          variant="text"
          size="small"
          color="error"
          @click="emit('delete', employee.id)"
        >
          <VIcon icon="tabler-trash" />
          <VTooltip activator="parent" location="top"> Delete </VTooltip>
        </VBtn>
      </div>
    </td>
  </tr>
</template>
