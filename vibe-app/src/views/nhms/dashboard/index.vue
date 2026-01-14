<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

// Dashboard Stats
const residentStats = ref({
  total: 156,
  active: 142,
  onLeave: 8,
  discharged: 6,
});

const healthStatus = ref({
  stable: 128,
  monitoring: 22,
  critical: 6,
});

const roomOccupancy = ref({
  total: 180,
  occupied: 168,
  available: 12,
  rate: 93.3,
});

const financialStats = ref({
  monthlyRevenue: 458500,
  outstandingBalance: 45300,
  paidInvoices: 142,
  pendingInvoices: 18,
});

// Alerts
const medicationAlerts = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    medication: "Metformin 500mg",
    time: "09:00 AM",
    status: "pending",
  },
  {
    id: 2,
    resident: "Robert Smith",
    room: "305B",
    medication: "Lisinopril 10mg",
    time: "09:30 AM",
    status: "pending",
  },
  {
    id: 3,
    resident: "Patricia Brown",
    room: "102C",
    medication: "Aspirin 81mg",
    time: "10:00 AM",
    status: "pending",
  },
]);

const healthAlerts = ref([
  {
    id: 1,
    resident: "James Wilson",
    room: "208A",
    alert: "High Blood Pressure",
    value: "165/95 mmHg",
    severity: "high",
  },
  {
    id: 2,
    resident: "Linda Davis",
    room: "410B",
    alert: "Low SpO₂",
    value: "89%",
    severity: "critical",
  },
  {
    id: 3,
    resident: "Michael Garcia",
    room: "315A",
    alert: "Irregular Heart Rate",
    value: "112 bpm",
    severity: "medium",
  },
]);

const contractAlerts = ref([
  {
    id: 1,
    resident: "Elizabeth Martinez",
    room: "102A",
    expiryDate: "2026-02-15",
    daysLeft: 34,
    status: "warning",
  },
  {
    id: 2,
    resident: "William Anderson",
    room: "204C",
    expiryDate: "2026-01-28",
    daysLeft: 16,
    status: "urgent",
  },
  {
    id: 3,
    resident: "Susan Taylor",
    room: "301B",
    expiryDate: "2026-03-10",
    daysLeft: 57,
    status: "normal",
  },
]);

const recentActivities = ref([
  {
    id: 1,
    type: "admission",
    resident: "John Doe",
    activity: "New resident admitted",
    room: "405A",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "medical",
    resident: "Jane Smith",
    activity: "Medical checkup completed",
    room: "208B",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "care",
    resident: "Bob Wilson",
    activity: "Care plan updated",
    room: "310C",
    time: "5 hours ago",
  },
  {
    id: 4,
    type: "payment",
    resident: "Alice Brown",
    activity: "Monthly payment received",
    room: "115A",
    time: "6 hours ago",
  },
]);

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    stable: "success",
    monitoring: "warning",
    critical: "error",
    high: "error",
    medium: "warning",
    urgent: "error",
    warning: "warning",
    normal: "success",
  };
  return colors[status] || "info";
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
</script>

<template>
  <VRow class="match-height">
    <!-- Resident Statistics -->
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <p class="text-sm mb-1 text-medium-emphasis">Total Residents</p>
              <h4 class="text-h4 mb-0">
                {{ residentStats.total }}
              </h4>
            </div>
            <VAvatar color="primary" variant="tonal" size="42">
              <VIcon icon="tabler-users" size="24" />
            </VAvatar>
          </div>

          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Active</span>
              <span class="text-sm font-weight-medium">{{
                residentStats.active
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">On Leave</span>
              <span class="text-sm font-weight-medium">{{
                residentStats.onLeave
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Discharged (This Month)</span>
              <span class="text-sm font-weight-medium">{{
                residentStats.discharged
              }}</span>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Health Status -->
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <p class="text-sm mb-1 text-medium-emphasis">Health Status</p>
              <h4 class="text-h4 mb-0">
                {{
                  healthStatus.stable +
                  healthStatus.monitoring +
                  healthStatus.critical
                }}
              </h4>
            </div>
            <VAvatar color="success" variant="tonal" size="42">
              <VIcon icon="tabler-heartbeat" size="24" />
            </VAvatar>
          </div>

          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center gap-2">
                <VIcon icon="tabler-circle-filled" color="success" size="8" />
                <span class="text-sm">Stable</span>
              </div>
              <span class="text-sm font-weight-medium">{{
                healthStatus.stable
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center gap-2">
                <VIcon icon="tabler-circle-filled" color="warning" size="8" />
                <span class="text-sm">Monitoring</span>
              </div>
              <span class="text-sm font-weight-medium">{{
                healthStatus.monitoring
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center gap-2">
                <VIcon icon="tabler-circle-filled" color="error" size="8" />
                <span class="text-sm">Critical</span>
              </div>
              <span class="text-sm font-weight-medium">{{
                healthStatus.critical
              }}</span>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Room Occupancy -->
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <p class="text-sm mb-1 text-medium-emphasis">Room Occupancy</p>
              <h4 class="text-h4 mb-0">{{ roomOccupancy.rate }}%</h4>
            </div>
            <VAvatar color="info" variant="tonal" size="42">
              <VIcon icon="tabler-bed" size="24" />
            </VAvatar>
          </div>

          <VProgressLinear
            :model-value="roomOccupancy.rate"
            color="info"
            height="6"
            rounded
            class="mb-3"
          />

          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Total Rooms</span>
              <span class="text-sm font-weight-medium">{{
                roomOccupancy.total
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Occupied</span>
              <span class="text-sm font-weight-medium">{{
                roomOccupancy.occupied
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Available</span>
              <span class="text-sm font-weight-medium text-success">{{
                roomOccupancy.available
              }}</span>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Financial Overview -->
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <p class="text-sm mb-1 text-medium-emphasis">Monthly Revenue</p>
              <h4 class="text-h4 mb-0">
                {{ formatCurrency(financialStats.monthlyRevenue) }}
              </h4>
            </div>
            <VAvatar color="warning" variant="tonal" size="42">
              <VIcon icon="tabler-currency-dollar" size="24" />
            </VAvatar>
          </div>

          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Outstanding</span>
              <span class="text-sm font-weight-medium text-warning">{{
                formatCurrency(financialStats.outstandingBalance)
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Paid Invoices</span>
              <span class="text-sm font-weight-medium">{{
                financialStats.paidInvoices
              }}</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-sm">Pending</span>
              <span class="text-sm font-weight-medium">{{
                financialStats.pendingInvoices
              }}</span>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Medication Alerts -->
    <VCol cols="12" md="4">
      <VCard>
        <VCardItem>
          <VCardTitle class="d-flex align-center gap-2">
            <VIcon icon="tabler-pill" color="error" />
            Medication Reminders
            <VSpacer />
            <VChip color="error" size="small">
              {{ medicationAlerts.length }}
            </VChip>
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText class="pa-0">
          <VList class="py-0">
            <VListItem
              v-for="alert in medicationAlerts"
              :key="alert.id"
              class="px-4"
            >
              <VListItemTitle class="font-weight-medium mb-1">
                {{ alert.resident }}
              </VListItemTitle>
              <VListItemSubtitle class="text-xs">
                <div>Room: {{ alert.room }}</div>
                <div class="text-primary">{{ alert.medication }}</div>
                <div class="d-flex align-center gap-1 mt-1">
                  <VIcon icon="tabler-clock" size="14" />
                  {{ alert.time }}
                </div>
              </VListItemSubtitle>

              <template #append>
                <VBtn
                  size="small"
                  color="primary"
                  variant="tonal"
                  @click="() => {}"
                >
                  Mark Done
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Health Alerts -->
    <VCol cols="12" md="4">
      <VCard>
        <VCardItem>
          <VCardTitle class="d-flex align-center gap-2">
            <VIcon icon="tabler-alert-triangle" color="warning" />
            Health Alerts
            <VSpacer />
            <VChip color="warning" size="small">
              {{ healthAlerts.length }}
            </VChip>
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText class="pa-0">
          <VList class="py-0">
            <VListItem
              v-for="alert in healthAlerts"
              :key="alert.id"
              class="px-4"
            >
              <template #prepend>
                <VAvatar
                  :color="getStatusColor(alert.severity)"
                  size="36"
                  variant="tonal"
                >
                  <VIcon icon="tabler-activity" size="20" />
                </VAvatar>
              </template>

              <VListItemTitle class="font-weight-medium mb-1">
                {{ alert.resident }}
              </VListItemTitle>
              <VListItemSubtitle class="text-xs">
                <div>Room: {{ alert.room }}</div>
                <div
                  class="font-weight-medium mt-1"
                  :class="`text-${getStatusColor(alert.severity)}`"
                >
                  {{ alert.alert }}: {{ alert.value }}
                </div>
              </VListItemSubtitle>

              <template #append>
                <VBtn size="small" icon variant="text" @click="() => {}">
                  <VIcon icon="tabler-chevron-right" />
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Contract Expiry Alerts -->
    <VCol cols="12" md="4">
      <VCard>
        <VCardItem>
          <VCardTitle class="d-flex align-center gap-2">
            <VIcon icon="tabler-file-alert" color="info" />
            Contract Expiry
            <VSpacer />
            <VChip color="info" size="small">
              {{ contractAlerts.length }}
            </VChip>
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText class="pa-0">
          <VList class="py-0">
            <VListItem
              v-for="alert in contractAlerts"
              :key="alert.id"
              class="px-4"
            >
              <VListItemTitle class="font-weight-medium mb-1">
                {{ alert.resident }}
              </VListItemTitle>
              <VListItemSubtitle class="text-xs">
                <div>Room: {{ alert.room }}</div>
                <div class="mt-1">Expires: {{ alert.expiryDate }}</div>
                <VChip
                  :color="getStatusColor(alert.status)"
                  size="x-small"
                  class="mt-1"
                >
                  {{ alert.daysLeft }} days left
                </VChip>
              </VListItemSubtitle>

              <template #append>
                <VBtn
                  size="small"
                  color="primary"
                  variant="tonal"
                  @click="() => {}"
                >
                  Renew
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Recent Activities -->
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle class="d-flex align-center gap-2">
            <VIcon icon="tabler-timeline" />
            Recent Activities
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <VCardText>
          <VTimeline align="start" truncate-line="both" density="compact">
            <VTimelineItem
              v-for="activity in recentActivities"
              :key="activity.id"
              dot-color="primary"
              size="x-small"
            >
              <div
                class="d-flex justify-space-between align-center flex-wrap mb-2"
              >
                <div>
                  <h6 class="text-base font-weight-medium mb-1">
                    {{ activity.resident }}
                  </h6>
                  <p class="text-sm mb-0">
                    {{ activity.activity }}
                  </p>
                  <span class="text-xs text-medium-emphasis"
                    >Room: {{ activity.room }}</span
                  >
                </div>
                <span class="text-xs text-medium-emphasis">{{
                  activity.time
                }}</span>
              </div>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
