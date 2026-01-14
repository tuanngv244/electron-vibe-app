<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const route = useRoute() as {params: {id: string}};
const router = useRouter();

const residentId = computed(() => route.params.id as string);

// Mock resident data
const residentData = ref({
  id: "NH001",
  name: "Mary Johnson",
  age: 78,
  gender: "Female",
  dateOfBirth: "1948-03-15",
  room: "201A",
  admissionDate: "2024-06-15",
  status: "active",
  healthStatus: "stable",
  adlLevel: "Independent",
  avatar: "",

  // Personal Information
  personalInfo: {
    nationality: "American",
    religion: "Christian",
    maritalStatus: "Widowed",
    bloodType: "O+",
    ssn: "***-**-4567",
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Daughter",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@email.com",
    },
  },

  // Medical History
  medicalHistory: {
    chronicConditions: ["Hypertension", "Type 2 Diabetes", "Osteoarthritis"],
    allergies: ["Penicillin", "Shellfish"],
    currentMedications: [
      {
        name: "Metformin 500mg",
        dosage: "2x daily",
        prescribedBy: "Dr. Smith",
      },
      {
        name: "Lisinopril 10mg",
        dosage: "1x daily",
        prescribedBy: "Dr. Smith",
      },
    ],
  },

  // Physical & Mental Condition
  condition: {
    mobility: "Uses walker for long distances",
    vision: "Wears glasses",
    hearing: "Normal",
    cognition: "Alert and oriented",
  },

  // ADL Assessment
  adlAssessment: {
    bathing: "Independent",
    dressing: "Independent",
    toileting: "Independent",
    transferring: "Independent",
    continence: "Independent",
    feeding: "Independent",
    lastAssessment: "2026-01-01",
  },

  // Care History
  careHistory: [
    {
      date: "2026-01-12",
      type: "Nursing Log",
      description:
        "Morning vitals taken. BP: 128/82, Temp: 98.2°F. Resident in good spirits.",
      staff: "Nurse Williams",
    },
    {
      date: "2026-01-11",
      type: "Medical Visit",
      description:
        "Routine checkup with Dr. Smith. All vitals normal. Medication continued.",
      staff: "Dr. Smith",
    },
  ],

  // Contract & Billing
  contract: {
    startDate: "2024-06-15",
    endDate: "2026-06-14",
    carePackage: "Standard Care Package",
    monthlyFee: 3500,
    status: "Active",
    lastPayment: "2026-01-01",
    balance: 0,
  },
});

const currentTab = ref("overview");

const tabs = [
  { title: "Overview", value: "overview", icon: "tabler-user" },
  {
    title: "Medical Records",
    value: "medical",
    icon: "tabler-clipboard-heart",
  },
  { title: "Care History", value: "care", icon: "tabler-history" },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "success",
    stable: "success",
    monitoring: "warning",
    critical: "error",
  };

  return colors[status] || "info";
};

const goBack = () => {
  router.push("/apps/nursing-home/resident-management/list");
};
</script>

<template>
  <VRow>
    <!-- Resident Profile Header -->
    <VCol cols="12">
      <VCard>
        <VCardText class="d-flex align-start gap-6">
          <!-- Avatar & Basic Info -->
          <div>
            <VAvatar
              :image="residentData.avatar"
              size="120"
              :color="!residentData.avatar ? 'primary' : undefined"
              variant="tonal"
              rounded
            >
              <span v-if="!residentData.avatar" class="text-h3">
                {{
                  residentData.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                }}
              </span>
            </VAvatar>
          </div>

          <!-- Details -->
          <div class="flex-grow-1">
            <div class="d-flex align-center gap-3 mb-3">
              <h4 class="text-h4 mb-0">
                {{ residentData.name }}
              </h4>
              <VChip :color="getStatusColor(residentData.status)" size="small">
                {{ residentData.status }}
              </VChip>
              <VChip
                :color="getStatusColor(residentData.healthStatus)"
                size="small"
                label
              >
                {{ residentData.healthStatus }}
              </VChip>
            </div>

            <VRow dense>
              <VCol cols="12" md="6" lg="3">
                <div class="d-flex align-center gap-2 mb-2">
                  <VIcon
                    icon="tabler-id"
                    size="20"
                    class="text-medium-emphasis"
                  />
                  <span class="text-sm">
                    <span class="text-medium-emphasis">ID:</span>
                    <span class="font-weight-medium ms-1">{{
                      residentData.id
                    }}</span>
                  </span>
                </div>
              </VCol>

              <VCol cols="12" md="6" lg="3">
                <div class="d-flex align-center gap-2 mb-2">
                  <VIcon
                    icon="tabler-calendar"
                    size="20"
                    class="text-medium-emphasis"
                  />
                  <span class="text-sm">
                    <span class="text-medium-emphasis">Age:</span>
                    <span class="font-weight-medium ms-1"
                      >{{ residentData.age }} years</span
                    >
                  </span>
                </div>
              </VCol>

              <VCol cols="12" md="6" lg="3">
                <div class="d-flex align-center gap-2 mb-2">
                  <VIcon
                    icon="tabler-bed"
                    size="20"
                    class="text-medium-emphasis"
                  />
                  <span class="text-sm">
                    <span class="text-medium-emphasis">Room:</span>
                    <span class="font-weight-medium ms-1">{{
                      residentData.room
                    }}</span>
                  </span>
                </div>
              </VCol>

              <VCol cols="12" md="6" lg="3">
                <div class="d-flex align-center gap-2 mb-2">
                  <VIcon
                    icon="tabler-gender-bigender"
                    size="20"
                    class="text-medium-emphasis"
                  />
                  <span class="text-sm">
                    <span class="text-medium-emphasis">Gender:</span>
                    <span class="font-weight-medium ms-1">{{
                      residentData.gender
                    }}</span>
                  </span>
                </div>
              </VCol>
            </VRow>
          </div>

          <!-- Actions -->
          <div class="d-flex gap-2">
            <VBtn
              variant="tonal"
              color="secondary"
              prepend-icon="tabler-arrow-left"
              @click="goBack"
            >
              Back
            </VBtn>
            <VBtn color="primary" prepend-icon="tabler-edit"> Edit </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Tabs -->
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <VIcon :icon="tab.icon" size="20" start />
          {{ tab.title }}
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <!-- Overview Tab -->
        <VWindowItem value="overview">
          <VRow>
            <!-- Personal Information -->
            <VCol cols="12" md="6">
              <VCard>
                <VCardItem>
                  <VCardTitle>Personal Information</VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <VList class="py-0">
                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Nationality
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{ residentData.personalInfo.nationality }}
                      </VListItemSubtitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Religion
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{ residentData.personalInfo.religion }}
                      </VListItemSubtitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Blood Type
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{ residentData.personalInfo.bloodType }}
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCardText>
              </VCard>
            </VCol>

            <!-- Emergency Contact -->
            <VCol cols="12" md="6">
              <VCard>
                <VCardItem>
                  <VCardTitle>Emergency Contact</VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <VList class="py-0">
                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Name
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{ residentData.personalInfo.emergencyContact.name }}
                      </VListItemSubtitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Relationship
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{
                          residentData.personalInfo.emergencyContact
                            .relationship
                        }}
                      </VListItemSubtitle>
                    </VListItem>

                    <VListItem>
                      <VListItemTitle class="text-sm text-medium-emphasis mb-1">
                        Phone
                      </VListItemTitle>
                      <VListItemSubtitle class="font-weight-medium">
                        {{ residentData.personalInfo.emergencyContact.phone }}
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCardText>
              </VCard>
            </VCol>

            <!-- ADL Assessment -->
            <VCol cols="12">
              <VCard>
                <VCardItem>
                  <VCardTitle class="d-flex align-center justify-space-between">
                    <span>ADL Assessment</span>
                    <VChip size="small" color="info">
                      Last: {{ residentData.adlAssessment.lastAssessment }}
                    </VChip>
                  </VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <VRow>
                    <VCol
                      v-for="(value, key) in residentData.adlAssessment"
                      :key="key"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="2"
                    >
                      <div v-if="key !== 'lastAssessment'" class="text-center">
                        <VIcon
                          icon="tabler-circle-check"
                          color="success"
                          size="32"
                          class="mb-2"
                        />
                        <p
                          class="text-sm font-weight-medium text-capitalize mb-1"
                        >
                          {{ key }}
                        </p>
                        <VChip color="success" size="x-small">
                          {{ value }}
                        </VChip>
                      </div>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <!-- Medical Records Tab -->
        <VWindowItem value="medical">
          <VRow>
            <!-- Chronic Conditions & Allergies -->
            <VCol cols="12" md="6">
              <VCard>
                <VCardItem>
                  <VCardTitle>Chronic Conditions</VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <div class="d-flex gap-2 flex-wrap">
                    <VChip
                      v-for="condition in residentData.medicalHistory
                        .chronicConditions"
                      :key="condition"
                      color="error"
                      variant="tonal"
                    >
                      {{ condition }}
                    </VChip>
                  </div>
                </VCardText>
              </VCard>

              <VCard class="mt-4">
                <VCardItem>
                  <VCardTitle class="d-flex align-center gap-2">
                    <VIcon icon="tabler-alert-triangle" color="warning" />
                    Allergies
                  </VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <div class="d-flex gap-2 flex-wrap">
                    <VChip
                      v-for="allergy in residentData.medicalHistory.allergies"
                      :key="allergy"
                      color="warning"
                      variant="tonal"
                    >
                      {{ allergy }}
                    </VChip>
                  </div>
                </VCardText>
              </VCard>
            </VCol>

            <!-- Current Medications -->
            <VCol cols="12" md="6">
              <VCard>
                <VCardItem>
                  <VCardTitle>Current Medications</VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText class="pa-0">
                  <VList class="py-0">
                    <VListItem
                      v-for="(med, index) in residentData.medicalHistory
                        .currentMedications"
                      :key="index"
                    >
                      <VListItemTitle class="font-weight-medium mb-1">
                        {{ med.name }}
                      </VListItemTitle>
                      <VListItemSubtitle class="text-xs">
                        <div>Dosage: {{ med.dosage }}</div>
                        <div class="text-primary">
                          By: {{ med.prescribedBy }}
                        </div>
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <!-- Care History Tab -->
        <VWindowItem value="care">
          <VCard>
            <VCardItem>
              <VCardTitle>Care History</VCardTitle>
            </VCardItem>
            <VDivider />
            <VCardText>
              <VTimeline align="start" truncate-line="both" side="end">
                <VTimelineItem
                  v-for="record in residentData.careHistory"
                  :key="record.date"
                  dot-color="primary"
                  size="small"
                >
                  <template #opposite>
                    <div class="text-sm text-medium-emphasis">
                      {{ record.date }}
                    </div>
                  </template>

                  <VCard>
                    <VCardText>
                      <div
                        class="d-flex align-center justify-space-between mb-2"
                      >
                        <VChip color="primary" size="small">
                          {{ record.type }}
                        </VChip>
                        <span class="text-xs text-medium-emphasis">{{
                          record.staff
                        }}</span>
                      </div>
                      <p class="mb-0">{{ record.description }}</p>
                    </VCardText>
                  </VCard>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
