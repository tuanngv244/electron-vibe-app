<script setup lang="ts">
import type { Document } from "@/types/nhms/human-resource";
import { DocumentType } from "@/types/nhms/human-resource";

interface Props {
  modelValue: Document[];
}

interface Emits {
  (e: "update:modelValue", value: Document[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const documents = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const documentTypeOptions = Object.values(DocumentType);

const addDocument = () => {
  documents.value.push({
    name: "",
    type: DocumentType.Other,
    uploadDate: new Date().toISOString().split("T")[0],
    size: "0 KB",
  });
};

const removeDocument = (index: number) => {
  documents.value.splice(index, 1);
};

const getDocumentIcon = (type: DocumentType) => {
  const iconMap = {
    [DocumentType.Resume]: "tabler-file-text",
    [DocumentType.License]: "tabler-license",
    [DocumentType.Certificate]: "tabler-certificate",
    [DocumentType.Background]: "tabler-file-check",
    [DocumentType.Contract]: "tabler-file-contract",
    [DocumentType.Other]: "tabler-file",
  };
  return iconMap[type] || "tabler-file";
};
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h6 class="text-h6">Documents</h6>
      <VBtn prepend-icon="tabler-upload" size="small" @click="addDocument">
        Upload Document
      </VBtn>
    </div>

    <VDataTable
      :headers="[
        { title: 'NAME', key: 'name' },
        { title: 'TYPE', key: 'type' },
        { title: 'UPLOAD DATE', key: 'uploadDate' },
        { title: 'SIZE', key: 'size' },
        { title: 'ACTIONS', key: 'actions', sortable: false },
      ]"
      :items="documents"
      :items-per-page="10"
    >
      <template #item.name="{ item }">
        <div class="d-flex align-center gap-2">
          <VIcon :icon="getDocumentIcon(item.type)" />
          <span>{{ item.name || "Untitled" }}</span>
        </div>
      </template>

      <template #item.type="{ item }">
        <VChip size="small">
          {{ item.type }}
        </VChip>
      </template>

      <template #item.actions="{ index }">
        <VBtn
          icon="tabler-trash"
          variant="text"
          size="small"
          color="error"
          @click="removeDocument(index)"
        />
      </template>

      <template #bottom>
        <div class="pa-4 text-center text-medium-emphasis">
          {{ documents.length }} document(s)
        </div>
      </template>
    </VDataTable>

    <VDialog v-if="documents.length > 0" max-width="600">
      <template #activator="{ props: dialogProps }">
        <VBtn v-bind="dialogProps" variant="text" class="mt-2">
          Edit Documents
        </VBtn>
      </template>

      <template #default="{ isActive }">
        <VCard title="Edit Documents">
          <VCardText>
            <VRow v-for="(doc, index) in documents" :key="index" class="mb-4">
              <VCol cols="12" md="6">
                <VTextField
                  v-model="doc.name"
                  label="Document Name"
                  placeholder="e.g., Resume.pdf"
                />
              </VCol>
              <VCol cols="12" md="6">
                <VSelect
                  v-model="doc.type"
                  :items="documentTypeOptions"
                  label="Document Type"
                />
              </VCol>
            </VRow>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn text="Close" @click="isActive.value = false" />
          </VCardActions>
        </VCard>
      </template>
    </VDialog>
  </div>
</template>
