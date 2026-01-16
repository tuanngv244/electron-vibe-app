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
    <VCol cols="12" md="4">
      <div class="text-center">
        <h3 class="text-h3 mb-1">{{ formData.performanceRating || 0 }}/5.0</h3>
        <VRating
          v-model="formData.performanceRating"
          color="warning"
          class="mb-2"
        />
        <p class="text-body-2 text-medium-emphasis">Performance Rating</p>
      </div>
    </VCol>
    <VCol cols="12" md="8">
      <VRow>
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.lastReviewDate"
            label="Last Review Date"
            type="date"
            placeholder="YYYY-MM-DD"
            persistent-placeholder
          />
        </VCol>
        <VCol cols="12" md="6">
          <VTextField
            v-model="formData.nextReviewDate"
            label="Next Review Date"
            type="date"
            placeholder="YYYY-MM-DD"
            persistent-placeholder
          />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>
