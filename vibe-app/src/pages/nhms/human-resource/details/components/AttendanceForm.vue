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

const availableLeaveDays = computed(() => {
  return formData.value.totalLeaveDays - formData.value.usedLeaveDays;
});
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <VCard>
        <VCardText class="text-center">
          <h4 class="text-h4 mb-1">
            {{ formData.totalLeaveDays || 0 }}
          </h4>
          <p class="text-body-2 text-medium-emphasis">Total Leave Days</p>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard>
        <VCardText class="text-center">
          <h4 class="text-h4 mb-1 text-warning">
            {{ formData.usedLeaveDays || 0 }}
          </h4>
          <p class="text-body-2 text-medium-emphasis">Used Leave Days</p>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VCard>
        <VCardText class="text-center">
          <h4 class="text-h4 mb-1 text-success">
            {{ availableLeaveDays }}
          </h4>
          <p class="text-body-2 text-medium-emphasis">Available Leave Days</p>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" md="4">
      <VTextField
        v-model.number="formData.totalLeaveDays"
        label="Total Leave Days"
        type="number"
      />
    </VCol>
    <VCol cols="12" md="4">
      <VTextField
        v-model.number="formData.usedLeaveDays"
        label="Used Leave Days"
        type="number"
      />
    </VCol>
    <VCol cols="12" md="4">
      <VTextField
        v-model.number="formData.sickDays"
        label="Sick Days"
        type="number"
      />
    </VCol>
  </VRow>
</template>
