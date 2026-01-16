<script setup lang="ts">
import {
  EmployeeType,
  EmployeeStatus,
  ShiftType,
} from "@/types/nhms/human-resource";
import { ROLES, DEPARTMENTS } from "../../consts";

interface Props {
  modelValue: any;
}

interface Emits {
  (e: "update:modelValue", value: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const employeeTypeOptions = Object.values(EmployeeType);
const statusOptions = Object.values(EmployeeStatus);
const shiftTypeOptions = Object.values(ShiftType);
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.employeeId"
        label="Employee ID"
        placeholder="EMP0001"
        readonly
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect v-model="formData.role" :items="ROLES" label="Role" />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.department"
        :items="DEPARTMENTS"
        label="Department"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.employeeType"
        :items="employeeTypeOptions"
        label="Employment Type"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.shiftType"
        :items="shiftTypeOptions"
        label="Shift Type"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.hireDate"
        label="Hire Date"
        type="date"
        placeholder="YYYY-MM-DD"
        persistent-placeholder
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model.number="formData.salary"
        label="Salary"
        type="number"
        prefix="$"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.status"
        :items="statusOptions"
        label="Status"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.supervisor"
        label="Supervisor"
        placeholder="Supervisor name"
      />
    </VCol>
  </VRow>
</template>
