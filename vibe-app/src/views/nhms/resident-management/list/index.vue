<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const router = useRouter();

const searchQuery = ref("");
const selectedStatus = ref();
const selectedRoom = ref();

// Data table options
const itemsPerPage = ref(10);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();

const headers = [
  { title: "RESIDENT ID", key: "id" },
  { title: "NAME", key: "name" },
  { title: "AGE", key: "age" },
  { title: "ROOM", key: "room" },
  { title: "HEALTH STATUS", key: "healthStatus" },
  { title: "ADL LEVEL", key: "adlLevel" },
  { title: "STATUS", key: "status" },
  { title: "ACTIONS", key: "actions", sortable: false },
];

const statusOptions = [
  { title: "All Status", value: "" },
  { title: "Active", value: "active" },
  { title: "On Leave", value: "on-leave" },
  { title: "Discharged", value: "discharged" },
];

const healthStatusOptions = [
  { title: "All Health Status", value: "" },
  { title: "Stable", value: "stable" },
  { title: "Monitoring", value: "monitoring" },
  { title: "Critical", value: "critical" },
];

// Mock data
const residents = ref([
  {
    id: "NH001",
    name: "Mary Johnson",
    age: 78,
    room: "201A",
    healthStatus: "stable",
    adlLevel: "Independent",
    status: "active",
    gender: "Female",
    admissionDate: "2024-06-15",
    avatar: "",
  },
  {
    id: "NH002",
    name: "Robert Smith",
    age: 82,
    room: "305B",
    healthStatus: "monitoring",
    adlLevel: "Partial Assistance",
    status: "active",
    gender: "Male",
    admissionDate: "2023-11-20",
    avatar: "",
  },
  {
    id: "NH003",
    name: "Patricia Brown",
    age: 75,
    room: "102C",
    healthStatus: "stable",
    adlLevel: "Independent",
    status: "active",
    gender: "Female",
    admissionDate: "2025-01-05",
    avatar: "",
  },
  {
    id: "NH004",
    name: "James Wilson",
    age: 85,
    room: "208A",
    healthStatus: "monitoring",
    adlLevel: "Full Assistance",
    status: "active",
    gender: "Male",
    admissionDate: "2023-08-10",
    avatar: "",
  },
  {
    id: "NH005",
    name: "Linda Davis",
    age: 80,
    room: "410B",
    healthStatus: "critical",
    adlLevel: "Full Assistance",
    status: "active",
    gender: "Female",
    admissionDate: "2024-03-22",
    avatar: "",
  },
  {
    id: "NH006",
    name: "Michael Garcia",
    age: 73,
    room: "315A",
    healthStatus: "stable",
    adlLevel: "Partial Assistance",
    status: "active",
    gender: "Male",
    admissionDate: "2024-09-12",
    avatar: "",
  },
  {
    id: "NH007",
    name: "Elizabeth Martinez",
    age: 77,
    room: "102A",
    healthStatus: "stable",
    adlLevel: "Independent",
    status: "on-leave",
    gender: "Female",
    admissionDate: "2023-05-18",
    avatar: "",
  },
  {
    id: "NH008",
    name: "William Anderson",
    age: 81,
    room: "204C",
    healthStatus: "monitoring",
    adlLevel: "Partial Assistance",
    status: "active",
    gender: "Male",
    admissionDate: "2024-07-30",
    avatar: "",
  },
]);

const totalResidents = computed(() => residents.value.length);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "success",
    "on-leave": "warning",
    discharged: "secondary",
    stable: "success",
    monitoring: "warning",
    critical: "error",
  };

  return colors[status] || "info";
};

const viewResidentDetails = (residentId: string) => {
  router.push(`/nhms/resident-management/details/${residentId}`);
};

const addNewResident = () => {
  // Navigate to add resident page or open dialog
  console.log("Add new resident");
};

const deleteResident = (residentId: string) => {
  console.log("Delete resident:", residentId);
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem class="pb-4">
          <VCardTitle>Resident Management</VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText>
          <VRow>
            <VCol cols="12" md="3">
              <VTextField
                v-model="searchQuery"
                placeholder="Search Resident"
                density="compact"
                prepend-inner-icon="tabler-search"
              />
            </VCol>

            <VCol cols="12" md="3">
              <VSelect
                v-model="selectedStatus"
                :items="statusOptions"
                item-title="title"
                item-value="value"
                placeholder="Filter by Status"
                density="compact"
                clearable
              />
            </VCol>

            <VCol cols="12" md="3">
              <VSelect
                v-model="selectedRoom"
                :items="healthStatusOptions"
                item-title="title"
                item-value="value"
                placeholder="Filter by Health Status"
                density="compact"
                clearable
              />
            </VCol>

            <VCol
              cols="12"
              md="3"
              class="d-flex align-center justify-end gap-2"
            >
              <VBtn
                color="primary"
                prepend-icon="tabler-plus"
                @click="addNewResident"
              >
                Add Resident
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VDataTableServer
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items="residents"
          :items-length="totalResidents"
          :headers="headers"
          class="text-no-wrap"
          @update:options="() => {}"
        >
          <!-- Name -->
          <template #item.name="{ item }">
            <div class="d-flex align-center gap-3">
              <VAvatar
                :image="item.avatar"
                size="34"
                :color="!item.avatar ? 'primary' : undefined"
                variant="tonal"
              >
                <span v-if="!item.avatar">{{
                  item.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-sm font-weight-medium">
                  {{ item.name }}
                </h6>
                <span class="text-xs text-medium-emphasis">{{
                  item.gender
                }}</span>
              </div>
            </div>
          </template>

          <!-- Health Status -->
          <template #item.healthStatus="{ item }">
            <VChip
              :color="getStatusColor(item.healthStatus)"
              size="small"
              label
            >
              {{ item.healthStatus }}
            </VChip>
          </template>

          <!-- Status -->
          <template #item.status="{ item }">
            <VChip :color="getStatusColor(item.status)" size="small">
              {{ item.status }}
            </VChip>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <div class="d-flex gap-1">
              <VBtn
                icon
                size="small"
                variant="text"
                color="medium-emphasis"
                @click="viewResidentDetails(item.id)"
              >
                <VIcon icon="tabler-eye" />
                <VTooltip activator="parent" location="top">
                  View Details
                </VTooltip>
              </VBtn>

              <VBtn icon size="small" variant="text" color="medium-emphasis">
                <VIcon icon="tabler-edit" />
                <VTooltip activator="parent" location="top"> Edit </VTooltip>
              </VBtn>

              <VBtn
                icon
                size="small"
                variant="text"
                color="error"
                @click="deleteResident(item.id)"
              >
                <VIcon icon="tabler-trash" />
                <VTooltip activator="parent" location="top"> Delete </VTooltip>
              </VBtn>
            </div>
          </template>

          <!-- Pagination -->
          <template #bottom>
            <VDivider />
            <div class="d-flex justify-end flex-wrap gap-x-6 px-2 py-1">
              <div
                class="d-flex align-center gap-x-2 text-medium-emphasis text-base"
              >
                Rows Per Page:
                <VSelect
                  v-model="itemsPerPage"
                  class="per-page-select"
                  variant="plain"
                  :items="[10, 20, 25, 50, 100]"
                />
              </div>

              <p
                class="d-flex align-center text-base text-high-emphasis me-2 mb-0"
              >
                {{ page }} - {{ Math.ceil(totalResidents / itemsPerPage) }} of
                {{ totalResidents }}
              </p>

              <div class="d-flex gap-x-2">
                <VBtn
                  icon="tabler-chevron-left"
                  variant="tonal"
                  density="comfortable"
                  color="default"
                  :disabled="page === 1"
                  @click="page--"
                />

                <VBtn
                  icon="tabler-chevron-right"
                  variant="tonal"
                  density="comfortable"
                  color="default"
                  :disabled="page >= Math.ceil(totalResidents / itemsPerPage)"
                  @click="page++"
                />
              </div>
            </div>
          </template>
        </VDataTableServer>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.per-page-select {
  margin-block: -0.5rem;
  inline-size: 4rem;
}
</style>
