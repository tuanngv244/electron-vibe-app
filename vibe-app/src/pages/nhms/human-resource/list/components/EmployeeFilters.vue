<script setup lang="ts">
import type { EmployeeListFilters } from '@/types/nhms/human-resource';
import { EmployeeStatus, EmployeeType, ShiftType } from '@/types/nhms/human-resource';
import { ROLES, DEPARTMENTS } from '../../consts';

interface Props {
  modelValue: EmployeeListFilters;
}

interface Emits {
  (e: 'update:modelValue', value: EmployeeListFilters): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const filters = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const statusOptions = [...Object.values(EmployeeStatus)];
const employeeTypeOptions = [...Object.values(EmployeeType)];
const shiftTypeOptions = [...Object.values(ShiftType)];
</script>

<template>
  <VCardText class="px-5 py-5">
    <VRow>
      <VCol cols="12" md="2">
        <VTextField
          v-model="filters.searchQuery"
          label="Search"
          placeholder="Name, email..."
          density="compact"
          prepend-inner-icon="tabler-search"
        />
      </VCol>
      <VCol cols="12" md="2">
        <VSelect
          v-model="filters.role"
          :items="ROLES as any"
          label="Role"
          placeholder="Select role"
          density="compact"
          clearable
        />
      </VCol>
      <VCol cols="12" md="2">
        <VSelect
          v-model="filters.department"
          :items="DEPARTMENTS as any"
          label="Department"
          placeholder="Select department"
          density="compact"
          clearable
        />
      </VCol>
      <VCol cols="12" md="2">
        <VSelect
          v-model="filters.employeeType"
          :items="employeeTypeOptions"
          label="Employment Type"
          placeholder="Select type"
          density="compact"
          clearable
        />
      </VCol>
      <VCol cols="12" md="2">
        <VSelect
          v-model="filters.shiftType"
          :items="shiftTypeOptions"
          label="Shift Type"
          placeholder="Select shift"
          density="compact"
          clearable
        />
      </VCol>
      <VCol cols="12" md="2">
        <VSelect
          v-model="filters.status"
          :items="statusOptions"
          label="Status"
          placeholder="Select status"
          density="compact"
          clearable
        />
      </VCol>
    </VRow>
  </VCardText>
</template>
