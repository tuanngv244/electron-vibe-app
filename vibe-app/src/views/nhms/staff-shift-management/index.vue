<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const searchQuery = ref("");
const selectedRole = ref();
const currentTab = ref("staff-list");

// Staff Data
const staffMembers = ref([
  {
    id: 1,
    name: "Sarah Williams",
    role: "Registered Nurse",
    certification: "RN #12345",
    phone: "+1 (555) 234-5678",
    shift: "Morning",
    status: "Active",
    performance: 4.8,
  },
  {
    id: 2,
    name: "Michael Taylor",
    role: "LPN",
    certification: "LPN #23456",
    phone: "+1 (555) 345-6789",
    shift: "Morning",
    status: "Active",
    performance: 4.6,
  },
  {
    id: 3,
    name: "Dr. Robert Smith",
    role: "Medical Director",
    certification: "MD #45678",
    phone: "+1 (555) 567-8901",
    shift: "Day",
    status: "Active",
    performance: 5.0,
  },
]);

// Shift Schedule
const shiftSchedule = ref([
  {
    date: "2026-01-12",
    dayOfWeek: "Monday",
    shifts: [
      {
        shiftName: "Morning Shift",
        time: "7AM - 3PM",
        staff: ["Sarah Williams", "Michael Taylor"],
      },
      {
        shiftName: "Afternoon Shift",
        time: "3PM - 11PM",
        staff: ["Emily Brown", "David Davis"],
      },
    ],
  },
]);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="staff-list">
          <VIcon icon="tabler-users" size="20" start />
          Staff Directory
        </VTab>
        <VTab value="shift-schedule">
          <VIcon icon="tabler-calendar-time" size="20" start />
          Shift Schedule
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <!-- Staff List Tab -->
        <VWindowItem value="staff-list">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Staff Directory</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="searchQuery"
                    placeholder="Search staff"
                    density="compact"
                    prepend-inner-icon="tabler-search"
                  />
                </VCol>

                <VCol cols="12" md="6" class="d-flex align-center justify-end">
                  <VBtn color="primary" prepend-icon="tabler-plus">
                    Add Staff
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol
                  v-for="staff in staffMembers"
                  :key="staff.id"
                  cols="12"
                  md="6"
                >
                  <VCard variant="outlined">
                    <VCardText>
                      <div class="d-flex align-center gap-4">
                        <VAvatar size="64" color="primary" variant="tonal">
                          <span class="text-h5">{{
                            staff.name.charAt(0)
                          }}</span>
                        </VAvatar>

                        <div class="flex-grow-1">
                          <h6 class="text-base font-weight-medium mb-1">
                            {{ staff.name }}
                          </h6>
                          <p class="text-sm text-medium-emphasis mb-2">
                            {{ staff.role }}
                          </p>

                          <div class="text-xs text-medium-emphasis mb-1">
                            <VIcon
                              icon="tabler-certificate"
                              size="14"
                              class="me-1"
                            />
                            {{ staff.certification }}
                          </div>
                          <div class="text-xs text-medium-emphasis">
                            <VIcon icon="tabler-phone" size="14" class="me-1" />
                            {{ staff.phone }}
                          </div>

                          <div class="d-flex align-center gap-2 mt-2">
                            <span class="text-xs">Rating:</span>
                            <VRating
                              :model-value="staff.performance"
                              density="compact"
                              size="small"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VWindowItem>

        <!-- Shift Schedule Tab -->
        <VWindowItem value="shift-schedule">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Shift Schedule</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <div v-for="schedule in shiftSchedule" :key="schedule.date">
                <div class="d-flex align-center gap-3 mb-4">
                  <VIcon icon="tabler-calendar" color="primary" size="24" />
                  <div>
                    <h6 class="text-base font-weight-medium">
                      {{ schedule.dayOfWeek }}
                    </h6>
                    <p class="text-sm text-medium-emphasis">
                      {{ schedule.date }}
                    </p>
                  </div>
                </div>

                <VRow>
                  <VCol
                    v-for="(shift, index) in schedule.shifts"
                    :key="index"
                    cols="12"
                    md="6"
                  >
                    <VCard variant="outlined">
                      <VCardItem>
                        <VCardTitle class="text-base">
                          {{ shift.shiftName }}
                        </VCardTitle>
                        <VCardSubtitle class="text-xs">
                          {{ shift.time }}
                        </VCardSubtitle>
                      </VCardItem>

                      <VDivider />

                      <VCardText>
                        <p class="text-sm font-weight-medium mb-2">Staff:</p>
                        <VChip
                          v-for="member in shift.staff"
                          :key="member"
                          size="small"
                          class="me-1 mb-1"
                        >
                          {{ member }}
                        </VChip>
                      </VCardText>
                    </VCard>
                  </VCol>
                </VRow>
              </div>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
