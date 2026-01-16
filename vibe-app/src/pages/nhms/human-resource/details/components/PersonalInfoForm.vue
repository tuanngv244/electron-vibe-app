<script setup lang="ts">
import { Gender, MaritalStatus } from "@/types/nhms/human-resource";

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

const genderOptions = Object.values(Gender);
const maritalStatusOptions = Object.values(MaritalStatus);
const countries = ["USA", "Canada", "Mexico", "UK", "Other"];
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.firstName"
        label="First Name"
        placeholder="Enter first name"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.lastName"
        label="Last Name"
        placeholder="Enter last name"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.email"
        label="Email"
        type="email"
        placeholder="email@example.com"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.phone"
        label="Phone"
        placeholder="+1 234-567-8900"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.dateOfBirth"
        label="Date of Birth"
        type="date"
        placeholder="YYYY-MM-DD"
        persistent-placeholder
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.gender"
        :items="genderOptions"
        label="Gender"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect
        v-model="formData.maritalStatus"
        :items="maritalStatusOptions"
        label="Marital Status"
      />
    </VCol>
    <VCol cols="12">
      <VTextField
        v-model="formData.address"
        label="Address"
        placeholder="Street address"
      />
    </VCol>
    <VCol cols="12" md="4">
      <VTextField v-model="formData.city" label="City" placeholder="City" />
    </VCol>
    <VCol cols="12" md="4">
      <VTextField
        v-model="formData.state"
        label="State/Province"
        placeholder="State"
      />
    </VCol>
    <VCol cols="12" md="4">
      <VTextField
        v-model="formData.zipCode"
        label="ZIP Code"
        placeholder="12345"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VSelect v-model="formData.country" :items="countries" label="Country" />
    </VCol>
  </VRow>
</template>
