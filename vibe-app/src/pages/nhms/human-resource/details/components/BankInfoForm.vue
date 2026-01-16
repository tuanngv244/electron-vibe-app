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
        v-model="formData.bankName"
        label="Bank Name"
        placeholder="Enter bank name"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.accountNumber"
        label="Account Number"
        placeholder="Enter account number"
        type="password"
      />
    </VCol>
    <VCol cols="12" md="6">
      <VTextField
        v-model="formData.routingNumber"
        label="Routing Number"
        placeholder="Enter routing number"
      />
    </VCol>
  </VRow>
</template>
