<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const searchQuery = ref("");
const selectedResident = ref();
const selectedDate = ref(new Date().toISOString().split("T")[0]);
const currentTab = ref("nursing-logs");

// Nursing Logs Data
const nursingLogs = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    date: "2026-01-12",
    time: "08:00 AM",
    category: "Meals & Nutrition",
    notes: "Breakfast consumed fully. Patient showed good appetite.",
    nurse: "Nurse Williams",
  },
  {
    id: 2,
    resident: "Robert Smith",
    room: "305B",
    date: "2026-01-12",
    time: "09:30 AM",
    category: "Personal Hygiene",
    notes: "Morning bath completed. Patient assisted with dressing.",
    nurse: "Nurse Taylor",
  },
  {
    id: 3,
    resident: "Patricia Brown",
    room: "102C",
    date: "2026-01-12",
    time: "10:00 AM",
    category: "Mobility & Exercise",
    notes: "Physical therapy session. Patient walked 15 minutes with walker.",
    nurse: "PT Johnson",
  },
  {
    id: 4,
    resident: "James Wilson",
    room: "208A",
    date: "2026-01-12",
    time: "11:00 AM",
    category: "Mental & Emotional",
    notes: "Participated in group activity. Engaged with other residents.",
    nurse: "Activity Coordinator",
  },
]);

// Care Plans
const carePlans = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    planType: "Weekly Care Plan",
    startDate: "2026-01-08",
    endDate: "2026-01-14",
    goals: [
      "Maintain independent mobility",
      "Monitor blood sugar levels",
      "Ensure adequate nutrition",
    ],
    activities: [
      { day: "Monday", activity: "Morning walk, Physical therapy" },
      { day: "Tuesday", activity: "Group exercise, Social activity" },
      { day: "Wednesday", activity: "Physical therapy, Music therapy" },
    ],
    status: "Active",
  },
  {
    id: 2,
    resident: "Robert Smith",
    room: "305B",
    planType: "Daily Care Plan",
    startDate: "2026-01-12",
    endDate: "2026-01-12",
    goals: ["Assistance with ADL", "Monitor vital signs", "Pain management"],
    activities: [
      { time: "08:00", activity: "Morning hygiene assistance" },
      { time: "12:00", activity: "Lunch and medication" },
      { time: "18:00", activity: "Evening care routine" },
    ],
    status: "Active",
  },
]);

// Task Checklists
const taskChecklists = ref([
  {
    id: 1,
    shift: "Morning Shift (7AM - 3PM)",
    date: "2026-01-12",
    tasks: [
      {
        id: 1,
        task: "Check vital signs for all residents",
        completed: true,
        assignedTo: "Nurse Williams",
      },
      {
        id: 2,
        task: "Administer morning medications",
        completed: true,
        assignedTo: "Nurse Williams",
      },
      {
        id: 3,
        task: "Assist with breakfast",
        completed: true,
        assignedTo: "Nurse Taylor",
      },
      {
        id: 4,
        task: "Morning hygiene assistance",
        completed: false,
        assignedTo: "Nurse Taylor",
      },
      {
        id: 5,
        task: "Document care activities",
        completed: false,
        assignedTo: "All Nurses",
      },
    ],
  },
  {
    id: 2,
    shift: "Afternoon Shift (3PM - 11PM)",
    date: "2026-01-12",
    tasks: [
      {
        id: 1,
        task: "Afternoon vital signs check",
        completed: false,
        assignedTo: "Nurse Brown",
      },
      {
        id: 2,
        task: "Assist with dinner",
        completed: false,
        assignedTo: "Nurse Davis",
      },
      {
        id: 3,
        task: "Evening medications",
        completed: false,
        assignedTo: "Nurse Brown",
      },
      {
        id: 4,
        task: "Prepare residents for bed",
        completed: false,
        assignedTo: "Nurse Davis",
      },
    ],
  },
]);

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Meals & Nutrition": "success",
    "Personal Hygiene": "info",
    "Mobility & Exercise": "warning",
    Sleep: "secondary",
    "Mental & Emotional": "primary",
  };
  return colors[category] || "default";
};

const toggleTask = (shiftId: number, taskId: number) => {
  const shift = taskChecklists.value.find((s) => s.id === shiftId);
  if (shift) {
    const task = shift.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
};
</script>

<template>
  <VRow>
    <!-- Tabs -->
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="nursing-logs">
          <VIcon icon="tabler-clipboard-text" size="20" start />
          Nursing Logs
        </VTab>
        <VTab value="care-plans">
          <VIcon icon="tabler-calendar-check" size="20" start />
          Care Plans
        </VTab>
        <VTab value="task-checklist">
          <VIcon icon="tabler-checklist" size="20" start />
          Task Checklists
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <!-- Nursing Logs Tab -->
        <VWindowItem value="nursing-logs">
          <VCard>
            <VCardItem class="pb-4">
              <VCardTitle>Nursing Logs</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="3">
                  <VTextField
                    v-model="searchQuery"
                    placeholder="Search logs"
                    density="compact"
                    prepend-inner-icon="tabler-search"
                  />
                </VCol>

                <VCol cols="12" md="3">
                  <VTextField
                    v-model="selectedDate"
                    type="date"
                    density="compact"
                    prepend-inner-icon="tabler-calendar"
                  />
                </VCol>

                <VCol cols="12" md="3">
                  <VSelect
                    v-model="selectedResident"
                    :items="[
                      'All Residents',
                      'Mary Johnson',
                      'Robert Smith',
                      'Patricia Brown',
                    ]"
                    placeholder="Filter by Resident"
                    density="compact"
                    clearable
                  />
                </VCol>

                <VCol cols="12" md="3" class="d-flex align-center justify-end">
                  <VBtn color="primary" prepend-icon="tabler-plus">
                    Add Log Entry
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>

            <VDivider />

            <VCardText>
              <VTimeline align="start" truncate-line="both" density="compact">
                <VTimelineItem
                  v-for="log in nursingLogs"
                  :key="log.id"
                  :dot-color="getCategoryColor(log.category)"
                  size="small"
                >
                  <template #opposite>
                    <div class="text-sm text-medium-emphasis">
                      {{ log.time }}
                    </div>
                  </template>

                  <VCard>
                    <VCardText>
                      <div
                        class="d-flex align-center justify-space-between mb-3"
                      >
                        <div>
                          <h6 class="text-base font-weight-medium mb-1">
                            {{ log.resident }}
                          </h6>
                          <span class="text-xs text-medium-emphasis"
                            >Room: {{ log.room }}</span
                          >
                        </div>
                        <VChip
                          :color="getCategoryColor(log.category)"
                          size="small"
                        >
                          {{ log.category }}
                        </VChip>
                      </div>
                      <p class="mb-2">{{ log.notes }}</p>
                      <div class="text-xs text-medium-emphasis">
                        Logged by: {{ log.nurse }}
                      </div>
                    </VCardText>
                  </VCard>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </VWindowItem>

        <!-- Care Plans Tab -->
        <VWindowItem value="care-plans">
          <VRow>
            <VCol v-for="plan in carePlans" :key="plan.id" cols="12" md="6">
              <VCard>
                <VCardItem>
                  <VCardTitle class="d-flex align-center justify-space-between">
                    <div>
                      <h5 class="mb-1">{{ plan.resident }}</h5>
                      <span class="text-sm text-medium-emphasis"
                        >Room: {{ plan.room }}</span
                      >
                    </div>
                    <VChip color="success" size="small">
                      {{ plan.status }}
                    </VChip>
                  </VCardTitle>
                </VCardItem>

                <VDivider />

                <VCardText>
                  <div class="mb-4">
                    <p class="text-sm text-medium-emphasis mb-1">Plan Type</p>
                    <p class="font-weight-medium">{{ plan.planType }}</p>
                  </div>

                  <div class="mb-4">
                    <p class="text-sm text-medium-emphasis mb-1">Duration</p>
                    <p class="font-weight-medium">
                      {{ plan.startDate }} - {{ plan.endDate }}
                    </p>
                  </div>

                  <div class="mb-4">
                    <p class="text-sm text-medium-emphasis mb-2">Care Goals</p>
                    <ul class="ps-4">
                      <li
                        v-for="(goal, index) in plan.goals"
                        :key="index"
                        class="mb-1"
                      >
                        {{ goal }}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p class="text-sm text-medium-emphasis mb-2">
                      Planned Activities
                    </p>
                    <VList class="pa-0" density="compact">
                      <VListItem
                        v-for="(activity, index) in plan.activities"
                        :key="index"
                        class="px-0"
                      >
                        <template #prepend>
                          <VIcon
                            icon="tabler-checkbox"
                            size="20"
                            class="me-2"
                          />
                        </template>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium"
                            >{{
                              "day" in activity ? activity.day : activity.time
                            }}:</span
                          >
                          {{ activity.activity }}
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </div>
                </VCardText>

                <VDivider />

                <VCardText class="d-flex gap-2">
                  <VBtn color="primary" size="small" variant="tonal">
                    Edit Plan
                  </VBtn>
                  <VBtn color="secondary" size="small" variant="text">
                    View Full Plan
                  </VBtn>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <!-- Task Checklist Tab -->
        <VWindowItem value="task-checklist">
          <VRow>
            <VCol
              v-for="shift in taskChecklists"
              :key="shift.id"
              cols="12"
              md="6"
            >
              <VCard>
                <VCardItem>
                  <VCardTitle>{{ shift.shift }}</VCardTitle>
                  <template #append>
                    <VChip color="info" size="small">
                      {{ shift.date }}
                    </VChip>
                  </template>
                </VCardItem>

                <VDivider />

                <VCardText class="pa-0">
                  <VList class="py-0">
                    <VListItem
                      v-for="task in shift.tasks"
                      :key="task.id"
                      @click="toggleTask(shift.id, task.id)"
                    >
                      <template #prepend>
                        <VCheckbox
                          :model-value="task.completed"
                          @click.stop="toggleTask(shift.id, task.id)"
                        />
                      </template>

                      <VListItemTitle
                        :class="{
                          'text-decoration-line-through text-medium-emphasis':
                            task.completed,
                        }"
                      >
                        {{ task.task }}
                      </VListItemTitle>
                      <VListItemSubtitle class="text-xs">
                        Assigned to: {{ task.assignedTo }}
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCardText>

                <VDivider />

                <VCardText>
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <span class="text-sm">Progress:</span>
                      <span class="font-weight-medium ms-2">
                        {{ shift.tasks.filter((t) => t.completed).length }} /
                        {{ shift.tasks.length }}
                      </span>
                    </div>
                    <VProgressLinear
                      :model-value="
                        (shift.tasks.filter((t) => t.completed).length /
                          shift.tasks.length) *
                        100
                      "
                      color="success"
                      height="6"
                      rounded
                      class="ms-4"
                      style="max-inline-size: 200px"
                    />
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
