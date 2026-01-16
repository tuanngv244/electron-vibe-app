<script setup lang="ts">
import type { Certification } from "@/types/nhms/human-resource";
import { CertificationStatus } from "@/types/nhms/human-resource";

interface Props {
  modelValue: Certification[];
}

interface Emits {
  (e: "update:modelValue", value: Certification[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const certifications = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const statusOptions = Object.values(CertificationStatus);

const addCertification = () => {
  certifications.value.push({
    name: "",
    issueDate: "",
    expiryDate: "",
    status: CertificationStatus.Active,
    issuingAuthority: "",
  });
};

const removeCertification = (index: number) => {
  certifications.value.splice(index, 1);
};

const getStatusColor = (status: CertificationStatus) => {
  const map = {
    [CertificationStatus.Active]: "success",
    [CertificationStatus.Expired]: "error",
    [CertificationStatus.Pending]: "warning",
  };
  return map[status] || "secondary";
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h6 class="text-h6">Certifications & Licenses</h6>
      <VBtn prepend-icon="tabler-plus" size="small" @click="addCertification">
        Add Certification
      </VBtn>
    </div>

    <VRow v-if="certifications.length === 0">
      <VCol cols="12">
        <VAlert type="info" variant="tonal">
          No certifications added yet. Click "Add Certification" to begin.
        </VAlert>
      </VCol>
    </VRow>

    <VCard v-for="(cert, index) in certifications" :key="index" class="mb-4">
      <VCardText>
        <div class="d-flex justify-space-between align-center mb-4">
          <VChip :color="getStatusColor(cert.status)" size="small">
            {{ cert.status }}
          </VChip>
          <VBtn
            icon="tabler-trash"
            variant="text"
            size="small"
            color="error"
            @click="removeCertification(index)"
          />
        </div>

        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="cert.name"
              label="Certification Name"
              placeholder="e.g., RN License"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              v-model="cert.issuingAuthority"
              label="Issuing Authority"
              placeholder="e.g., State Board of Nursing"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              v-model="cert.issueDate"
              label="Issue Date"
              type="date"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              v-model="cert.expiryDate"
              label="Expiry Date"
              type="date"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VSelect
              v-model="cert.status"
              :items="statusOptions"
              label="Status"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>
