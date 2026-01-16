<script setup lang="ts">
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
</script>

<template>
  <VRow>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.emergencyName"
        label="Contact Name"
        placeholder="Enter contact name"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.emergencyRelation"
        label="Relationship"
        placeholder="e.g., Spouse, Parent"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.emergencyPhone"
        label="Phone Number"
        placeholder="+1 234-567-8900"
      />
    </VCol>
    <VCol cols="12">
      <VTextField
        v-model="formData.emergencyAddress"
        label="Address"
        placeholder="Full address"
      />
    </VCol>
  </VRow>
</template>
