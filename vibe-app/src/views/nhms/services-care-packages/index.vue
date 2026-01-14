<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const currentTab = ref("care-packages");

const carePackages = ref([
  {
    id: 1,
    name: "Basic Care Package",
    category: "Standard",
    price: 2500,
    description: "Essential daily care and assistance",
    includes: [
      "Room & Board",
      "Three meals daily",
      "Basic hygiene assistance",
      "Medication management",
      "Weekly vital signs check",
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "Medical Care Package",
    category: "Medical",
    price: 3800,
    description: "Comprehensive medical monitoring",
    includes: [
      "All Basic Care services",
      "Daily vital signs monitoring",
      "Chronic disease management",
      "Bi-weekly doctor visits",
      "Physical therapy sessions",
    ],
    status: "Active",
  },
  {
    id: 3,
    name: "Rehabilitation Package",
    category: "Specialty",
    price: 4500,
    description: "Intensive rehabilitation program",
    includes: [
      "All Medical Care services",
      "Daily physical therapy",
      "Occupational therapy",
      "Speech therapy",
      "Specialized equipment",
    ],
    status: "Active",
  },
]);

const additionalServices = ref([
  { id: 1, service: "Personal Laundry", price: 150, unit: "month" },
  { id: 2, service: "Beauty/Barber Services", price: 40, unit: "visit" },
  { id: 3, service: "Transportation", price: 50, unit: "trip" },
  { id: 4, service: "Private Nursing (1-on-1)", price: 80, unit: "hour" },
]);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="care-packages">
          <VIcon icon="tabler-package" size="20" start />
          Care Packages
        </VTab>
        <VTab value="additional-services">
          <VIcon icon="tabler-list-check" size="20" start />
          Additional Services
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <VWindowItem value="care-packages">
          <VRow>
            <VCol v-for="pkg in carePackages" :key="pkg.id" cols="12" md="4">
              <VCard>
                <VCardItem>
                  <VCardTitle>{{ pkg.name }}</VCardTitle>
                  <template #append>
                    <VChip size="small" color="info">
                      {{ pkg.category }}
                    </VChip>
                  </template>
                </VCardItem>

                <VDivider />

                <VCardText>
                  <div class="mb-4">
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-h4 text-primary"
                        >${{ pkg.price.toLocaleString() }}</span
                      >
                      <span class="text-sm text-medium-emphasis">/month</span>
                    </div>
                    <p class="text-sm text-medium-emphasis">
                      {{ pkg.description }}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm font-weight-medium mb-2">
                      Package Includes:
                    </p>
                    <ul class="ps-4">
                      <li
                        v-for="(item, index) in pkg.includes"
                        :key="index"
                        class="text-sm mb-1"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </VCardText>

                <VDivider />

                <VCardText>
                  <VBtn color="primary" block> Select Package </VBtn>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <VWindowItem value="additional-services">
          <VCard>
            <VCardItem>
              <VCardTitle>Additional Services</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem
                  v-for="service in additionalServices"
                  :key="service.id"
                >
                  <VListItemTitle class="font-weight-medium">
                    {{ service.service }}
                  </VListItemTitle>
                  <template #append>
                    <div class="text-end">
                      <div class="text-h6 text-primary">
                        ${{ service.price }}
                      </div>
                      <div class="text-xs text-medium-emphasis">
                        per {{ service.unit }}
                      </div>
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
