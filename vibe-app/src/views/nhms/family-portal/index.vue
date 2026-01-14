<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const residentData = ref({
  name: "Mary Johnson",
  room: "201A",
  healthStatus: "Stable",
  lastUpdate: "2026-01-12 08:30 AM",
});

const recentActivities = ref([
  {
    date: "2026-01-12",
    time: "08:00 AM",
    activity: "Breakfast",
    notes: "Ate well, enjoyed oatmeal and fruit",
    staff: "Nurse Williams",
  },
  {
    date: "2026-01-12",
    time: "10:00 AM",
    activity: "Physical Therapy",
    notes: "Completed 20-minute walking session",
    staff: "PT Johnson",
  },
  {
    date: "2026-01-11",
    time: "14:00 PM",
    activity: "Social Activity",
    notes: "Participated in group music therapy",
    staff: "Activity Coordinator",
  },
]);

const vitals = ref({
  bloodPressure: "128/82",
  heartRate: 72,
  temperature: 98.2,
  recorded: "2026-01-12 08:00 AM",
});

const upcomingEvents = ref([
  { date: "2026-01-15", event: "Doctor Checkup", time: "10:00 AM" },
  { date: "2026-01-18", event: "Family Visit Day", time: "14:00 PM" },
]);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VAlert color="info" variant="tonal" class="mb-6">
        <VIcon icon="tabler-info-circle" size="20" class="me-2" />
        Welcome to the Family Portal. View your loved one's care information and
        updates.
      </VAlert>
    </VCol>

    <VCol cols="12" md="4">
      <VCard>
        <VCardItem>
          <VCardTitle>Resident Information</VCardTitle>
        </VCardItem>
        <VDivider />
        <VCardText>
          <div class="text-center mb-4">
            <VAvatar size="80" color="primary" variant="tonal" class="mb-3">
              <span class="text-h3">MJ</span>
            </VAvatar>
            <h5 class="text-h5 mb-1">{{ residentData.name }}</h5>
            <p class="text-sm text-medium-emphasis">
              Room {{ residentData.room }}
            </p>
          </div>
          <VDivider class="my-4" />
          <div>
            <p class="text-sm text-medium-emphasis mb-1">Health Status</p>
            <VChip color="success" size="small" class="mb-3">
              {{ residentData.healthStatus }}
            </VChip>
            <p class="text-xs text-medium-emphasis">
              Last updated: {{ residentData.lastUpdate }}
            </p>
          </div>
        </VCardText>
      </VCard>

      <VCard class="mt-4">
        <VCardItem>
          <VCardTitle class="text-base">Latest Vitals</VCardTitle>
        </VCardItem>
        <VDivider />
        <VCardText>
          <VList class="py-0" density="compact">
            <VListItem>
              <VListItemTitle class="text-sm">Blood Pressure</VListItemTitle>
              <template #append>
                <span class="font-weight-medium">{{
                  vitals.bloodPressure
                }}</span>
              </template>
            </VListItem>
            <VListItem>
              <VListItemTitle class="text-sm">Heart Rate</VListItemTitle>
              <template #append>
                <span class="font-weight-medium"
                  >{{ vitals.heartRate }} bpm</span
                >
              </template>
            </VListItem>
            <VListItem>
              <VListItemTitle class="text-sm">Temperature</VListItemTitle>
              <template #append>
                <span class="font-weight-medium"
                  >{{ vitals.temperature }}°F</span
                >
              </template>
            </VListItem>
          </VList>
          <p class="text-xs text-medium-emphasis mt-3">{{ vitals.recorded }}</p>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="8">
      <VCard class="mb-4">
        <VCardItem>
          <VCardTitle>Recent Activities</VCardTitle>
        </VCardItem>
        <VDivider />
        <VCardText>
          <VTimeline align="start" truncate-line="both" density="compact">
            <VTimelineItem
              v-for="activity in recentActivities"
              :key="activity.date + activity.time"
              dot-color="primary"
              size="small"
            >
              <template #opposite>
                <div class="text-sm text-medium-emphasis">
                  {{ activity.time }}
                </div>
              </template>
              <VCard variant="outlined">
                <VCardText>
                  <h6 class="text-base font-weight-medium mb-1">
                    {{ activity.activity }}
                  </h6>
                  <p class="text-sm mb-2">{{ activity.notes }}</p>
                  <p class="text-xs text-medium-emphasis">
                    Staff: {{ activity.staff }}
                  </p>
                </VCardText>
              </VCard>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>

      <VCard>
        <VCardItem>
          <VCardTitle>Upcoming Events</VCardTitle>
        </VCardItem>
        <VDivider />
        <VCardText class="pa-0">
          <VList class="py-0">
            <VListItem v-for="event in upcomingEvents" :key="event.date">
              <template #prepend>
                <VAvatar color="info" variant="tonal">
                  <VIcon icon="tabler-calendar-event" />
                </VAvatar>
              </template>
              <VListItemTitle>{{ event.event }}</VListItemTitle>
              <VListItemSubtitle>
                {{ event.date }} at {{ event.time }}
              </VListItemSubtitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
