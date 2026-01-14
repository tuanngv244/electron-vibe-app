<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const searchQuery = ref("");
const selectedResident = ref();
const currentTab = ref("prescriptions");

// Prescriptions Data
const prescriptions = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    medication: "Metformin 500mg",
    dosage: "2x daily (Morning & Evening)",
    prescribedBy: "Dr. Smith",
    startDate: "2024-06-15",
    type: "Long-term",
    status: "Active",
    nextDose: "2026-01-12 18:00",
  },
  {
    id: 2,
    resident: "Robert Smith",
    room: "305B",
    medication: "Lisinopril 10mg",
    dosage: "1x daily (Morning)",
    prescribedBy: "Dr. Brown",
    startDate: "2023-11-20",
    type: "Long-term",
    status: "Active",
    nextDose: "2026-01-13 08:00",
  },
  {
    id: 3,
    resident: "James Wilson",
    room: "208A",
    medication: "Acetaminophen 500mg",
    dosage: "As needed (Max 4x daily)",
    prescribedBy: "Dr. Smith",
    startDate: "2026-01-10",
    type: "As-needed",
    status: "Active",
    nextDose: "PRN",
  },
]);

// Vital Signs Monitoring
const vitalSigns = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    date: "2026-01-12",
    time: "08:00 AM",
    bloodPressure: "128/82",
    heartRate: 72,
    temperature: 98.2,
    spo2: 97,
    bloodGlucose: 105,
    recordedBy: "Nurse Williams",
  },
  {
    id: 2,
    resident: "Linda Davis",
    room: "410B",
    date: "2026-01-12",
    time: "08:15 AM",
    bloodPressure: "142/88",
    heartRate: 85,
    temperature: 98.6,
    spo2: 89,
    bloodGlucose: null,
    recordedBy: "Nurse Williams",
    alert: "Low SpO₂",
  },
  {
    id: 3,
    resident: "Robert Smith",
    room: "305B",
    date: "2026-01-12",
    time: "08:30 AM",
    bloodPressure: "135/85",
    heartRate: 78,
    temperature: 98.4,
    spo2: 96,
    bloodGlucose: null,
    recordedBy: "Nurse Taylor",
  },
]);

// Appointments
const appointments = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    type: "In-house Checkup",
    doctor: "Dr. Smith",
    date: "2026-01-15",
    time: "10:00 AM",
    status: "Scheduled",
    notes: "Routine monthly checkup",
  },
  {
    id: 2,
    resident: "James Wilson",
    room: "208A",
    type: "External Hospital Visit",
    doctor: "Cardiologist - Dr. Johnson",
    date: "2026-01-18",
    time: "14:00 PM",
    status: "Scheduled",
    notes: "Cardiology consultation at City Hospital",
  },
  {
    id: 3,
    resident: "Patricia Brown",
    room: "102C",
    type: "In-house Checkup",
    doctor: "Dr. Brown",
    date: "2026-01-12",
    time: "11:00 AM",
    status: "Completed",
    notes: "Follow-up on recent fall",
  },
]);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Active: "success",
    Inactive: "secondary",
    Scheduled: "info",
    Completed: "success",
    Cancelled: "error",
  };
  return colors[status] || "default";
};

const getVitalStatus = (type: string, value: number) => {
  if (type === "spo2" && value < 92) return "error";
  if (type === "heartRate" && (value < 60 || value > 100)) return "warning";
  if (type === "temperature" && (value < 97 || value > 99)) return "warning";
  return "success";
};
</script>

<template>
  <VRow>
    <!-- Tabs -->
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="prescriptions">
          <VIcon icon="tabler-pill" size="20" start />
          Prescriptions
        </VTab>
        <VTab value="vital-signs">
          <VIcon icon="tabler-heartbeat" size="20" start />
          Vital Signs
        </VTab>
        <VTab value="appointments">
          <VIcon icon="tabler-calendar-event" size="20" start />
          Appointments
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <!-- Prescriptions Tab -->
        <VWindowItem value="prescriptions">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Prescription Management</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="4">
                  <VTextField
                    v-model="searchQuery"
                    placeholder="Search prescriptions"
                    density="compact"
                    prepend-inner-icon="tabler-search"
                  />
                </VCol>

                <VCol cols="12" md="4">
                  <VSelect
                    v-model="selectedResident"
                    :items="[
                      'All Residents',
                      'Mary Johnson',
                      'Robert Smith',
                      'James Wilson',
                    ]"
                    placeholder="Filter by Resident"
                    density="compact"
                    clearable
                  />
                </VCol>

                <VCol cols="12" md="4" class="d-flex align-center justify-end">
                  <VBtn color="primary" prepend-icon="tabler-plus">
                    Add Prescription
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

            <VDivider />

            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem
                  v-for="prescription in prescriptions"
                  :key="prescription.id"
                  class="px-4"
                >
                  <template #prepend>
                    <VAvatar color="primary" variant="tonal" size="48">
                      <VIcon icon="tabler-pill" size="24" />
                    </VAvatar>
                  </template>

                  <VListItemTitle class="font-weight-medium mb-1">
                    {{ prescription.medication }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    <div class="mb-1">
                      <span class="font-weight-medium">{{
                        prescription.resident
                      }}</span>
                      <span class="text-medium-emphasis ms-2"
                        >Room: {{ prescription.room }}</span
                      >
                    </div>
                    <div class="mb-1">Dosage: {{ prescription.dosage }}</div>
                    <div class="mb-1">
                      Prescribed by: {{ prescription.prescribedBy }}
                    </div>
                    <div>
                      <VChip
                        :color="
                          prescription.type === 'Long-term' ? 'info' : 'warning'
                        "
                        size="x-small"
                        class="me-1"
                      >
                        {{ prescription.type }}
                      </VChip>
                      <VChip
                        :color="getStatusColor(prescription.status)"
                        size="x-small"
                      >
                        {{ prescription.status }}
                      </VChip>
                    </div>
                  </VListItemSubtitle>

                  <template #append>
                    <div class="text-end">
                      <div class="text-xs text-medium-emphasis mb-1">
                        Next Dose
                      </div>
                      <div class="text-sm font-weight-medium">
                        {{ prescription.nextDose }}
                      </div>
                    </div>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VWindowItem>

        <!-- Vital Signs Tab -->
        <VWindowItem value="vital-signs">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Vital Signs Monitoring</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="4">
                  <VTextField
                    v-model="searchQuery"
                    placeholder="Search records"
                    density="compact"
                    prepend-inner-icon="tabler-search"
                  />
                </VCol>

                <VCol cols="12" md="4">
                  <VTextField
                    type="date"
                    density="compact"
                    prepend-inner-icon="tabler-calendar"
                  />
                </VCol>

                <VCol cols="12" md="4" class="d-flex align-center justify-end">
                  <VBtn color="primary" prepend-icon="tabler-plus">
                    Record Vitals
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol v-for="vital in vitalSigns" :key="vital.id" cols="12">
                  <VCard variant="outlined">
                    <VCardText>
                      <div
                        class="d-flex align-center justify-space-between mb-4"
                      >
                        <div>
                          <h6 class="text-base font-weight-medium mb-1">
                            {{ vital.resident }}
                          </h6>
                          <span class="text-xs text-medium-emphasis">
                            Room: {{ vital.room }} • {{ vital.date }}
                            {{ vital.time }}
                          </span>
                        </div>
                        <VChip v-if="vital.alert" color="error" size="small">
                          {{ vital.alert }}
                        </VChip>
                      </div>

                      <VRow>
                        <VCol cols="6" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-heart"
                              :color="
                                getVitalStatus('heartRate', vital.heartRate)
                              "
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              Heart Rate
                            </p>
                            <p class="font-weight-medium">
                              {{ vital.heartRate }} bpm
                            </p>
                          </div>
                        </VCol>

                        <VCol cols="6" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-activity"
                              color="error"
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              Blood Pressure
                            </p>
                            <p class="font-weight-medium">
                              {{ vital.bloodPressure }}
                            </p>
                          </div>
                        </VCol>

                        <VCol cols="6" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-temperature"
                              :color="
                                getVitalStatus('temperature', vital.temperature)
                              "
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              Temperature
                            </p>
                            <p class="font-weight-medium">
                              {{ vital.temperature }}°F
                            </p>
                          </div>
                        </VCol>

                        <VCol cols="6" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-lungs"
                              :color="getVitalStatus('spo2', vital.spo2)"
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              SpO₂
                            </p>
                            <p class="font-weight-medium">{{ vital.spo2 }}%</p>
                          </div>
                        </VCol>

                        <VCol v-if="vital.bloodGlucose" cols="6" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-droplet"
                              color="warning"
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              Blood Glucose
                            </p>
                            <p class="font-weight-medium">
                              {{ vital.bloodGlucose }} mg/dL
                            </p>
                          </div>
                        </VCol>

                        <VCol cols="12" sm="4" md="2">
                          <div class="text-center">
                            <VIcon
                              icon="tabler-user-check"
                              color="secondary"
                              size="32"
                              class="mb-2"
                            />
                            <p class="text-xs text-medium-emphasis mb-1">
                              Recorded By
                            </p>
                            <p class="font-weight-medium text-xs">
                              {{ vital.recordedBy }}
                            </p>
                          </div>
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VWindowItem>

        <!-- Appointments Tab -->
        <VWindowItem value="appointments">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Medical Appointments</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <VTextField
                    v-model="searchQuery"
                    placeholder="Search appointments"
                    density="compact"
                    prepend-inner-icon="tabler-search"
                  />
                </VCol>

                <VCol cols="12" md="6" class="d-flex align-center justify-end">
                  <VBtn color="primary" prepend-icon="tabler-plus">
                    Schedule Appointment
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

            <VDivider />

            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem
                  v-for="appointment in appointments"
                  :key="appointment.id"
                  class="px-4"
                >
                  <template #prepend>
                    <VAvatar
                      :color="
                        appointment.type === 'External Hospital Visit'
                          ? 'warning'
                          : 'info'
                      "
                      variant="tonal"
                      size="48"
                    >
                      <VIcon
                        :icon="
                          appointment.type === 'External Hospital Visit'
                            ? 'tabler-building-hospital'
                            : 'tabler-stethoscope'
                        "
                        size="24"
                      />
                    </VAvatar>
                  </template>

                  <VListItemTitle class="font-weight-medium mb-1">
                    {{ appointment.resident }} - {{ appointment.type }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    <div class="mb-1">Room: {{ appointment.room }}</div>
                    <div class="mb-1">Doctor: {{ appointment.doctor }}</div>
                    <div class="mb-1">
                      <VIcon icon="tabler-calendar" size="14" class="me-1" />
                      {{ appointment.date }} at {{ appointment.time }}
                    </div>
                    <div class="mb-1">{{ appointment.notes }}</div>
                    <VChip
                      :color="getStatusColor(appointment.status)"
                      size="x-small"
                    >
                      {{ appointment.status }}
                    </VChip>
                  </VListItemSubtitle>

                  <template #append>
                    <div class="d-flex gap-1">
                      <VBtn
                        v-if="appointment.status === 'Scheduled'"
                        size="small"
                        color="success"
                        variant="tonal"
                      >
                        Complete
                      </VBtn>
                      <VBtn size="small" color="secondary" variant="text" icon>
                        <VIcon icon="tabler-edit" />
                      </VBtn>
                    </div>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
