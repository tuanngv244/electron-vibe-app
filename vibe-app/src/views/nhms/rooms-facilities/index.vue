<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const searchQuery = ref("");
const selectedFloor = ref();
const selectedStatus = ref();

const rooms = ref([
  {
    id: "201A",
    floor: "2nd Floor",
    type: "Single",
    status: "Occupied",
    resident: "Mary Johnson",
    monthlyRate: 3500,
    lastMaintenance: "2025-12-15",
    amenities: ["Private Bath", "Window View", "TV"],
  },
  {
    id: "305B",
    floor: "3rd Floor",
    type: "Double",
    status: "Occupied",
    resident: "Robert Smith & John Doe",
    monthlyRate: 2800,
    lastMaintenance: "2026-01-05",
    amenities: ["Shared Bath", "Garden View"],
  },
  {
    id: "410C",
    floor: "4th Floor",
    type: "VIP Suite",
    status: "Occupied",
    resident: "Linda Davis",
    monthlyRate: 5000,
    lastMaintenance: "2025-11-20",
    amenities: ["Private Bath", "Balcony", "Kitchenette", "Premium TV"],
  },
  {
    id: "102D",
    floor: "1st Floor",
    type: "Single",
    status: "Available",
    resident: null,
    monthlyRate: 3500,
    lastMaintenance: "2026-01-10",
    amenities: ["Private Bath", "Courtyard View"],
  },
  {
    id: "208E",
    floor: "2nd Floor",
    type: "Single",
    status: "Maintenance",
    resident: null,
    monthlyRate: 3500,
    lastMaintenance: "In Progress",
    amenities: ["Private Bath", "Window View"],
  },
]);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Occupied: "success",
    Available: "info",
    Maintenance: "warning",
    Reserved: "secondary",
  };
  return colors[status] || "default";
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    Single: "primary",
    Double: "secondary",
    "VIP Suite": "warning",
  };
  return colors[type] || "default";
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem class="pb-4">
          <VCardTitle>Rooms & Facilities Management</VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText>
          <VRow>
            <VCol cols="12" md="3">
              <VTextField
                v-model="searchQuery"
                placeholder="Search rooms"
                density="compact"
                prepend-inner-icon="tabler-search"
              />
            </VCol>

            <VCol cols="12" md="3">
              <VSelect
                v-model="selectedFloor"
                :items="[
                  'All Floors',
                  '1st Floor',
                  '2nd Floor',
                  '3rd Floor',
                  '4th Floor',
                ]"
                placeholder="Filter by Floor"
                density="compact"
                clearable
              />
            </VCol>

            <VCol cols="12" md="3">
              <VSelect
                v-model="selectedStatus"
                :items="[
                  'All Status',
                  'Occupied',
                  'Available',
                  'Maintenance',
                  'Reserved',
                ]"
                placeholder="Filter by Status"
                density="compact"
                clearable
              />
            </VCol>

            <VCol cols="12" md="3" class="d-flex align-center justify-end">
              <VBtn color="primary" prepend-icon="tabler-plus"> Add Room </VBtn>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VCardText>
          <VRow>
            <VCol v-for="room in rooms" :key="room.id" cols="12" md="6" lg="4">
              <VCard variant="outlined">
                <VCardItem>
                  <VCardTitle class="d-flex align-center justify-space-between">
                    <span>Room {{ room.id }}</span>
                    <VChip :color="getStatusColor(room.status)" size="small">
                      {{ room.status }}
                    </VChip>
                  </VCardTitle>
                  <VCardSubtitle class="mt-1">
                    {{ room.floor }} • {{ room.type }}
                  </VCardSubtitle>
                </VCardItem>

                <VDivider />

                <VCardText>
                  <div class="mb-3">
                    <p class="text-sm text-medium-emphasis mb-1">
                      Current Resident
                    </p>
                    <p class="font-weight-medium">
                      {{ room.resident || "Vacant" }}
                    </p>
                  </div>

                  <div class="mb-3">
                    <p class="text-sm text-medium-emphasis mb-1">
                      Monthly Rate
                    </p>
                    <p class="text-h6 text-success">
                      ${{ room.monthlyRate.toLocaleString() }}
                    </p>
                  </div>

                  <div class="mb-3">
                    <p class="text-sm text-medium-emphasis mb-1">Amenities</p>
                    <div class="d-flex gap-1 flex-wrap">
                      <VChip
                        v-for="amenity in room.amenities"
                        :key="amenity"
                        size="x-small"
                        color="info"
                        variant="tonal"
                      >
                        {{ amenity }}
                      </VChip>
                    </div>
                  </div>

                  <div>
                    <p class="text-sm text-medium-emphasis mb-1">
                      Last Maintenance
                    </p>
                    <p class="text-sm">{{ room.lastMaintenance }}</p>
                  </div>
                </VCardText>

                <VDivider />

                <VCardText class="d-flex gap-2">
                  <VBtn size="small" variant="tonal" color="primary">
                    View Details
                  </VBtn>
                  <VBtn size="small" variant="text" icon>
                    <VIcon icon="tabler-edit" />
                  </VBtn>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
