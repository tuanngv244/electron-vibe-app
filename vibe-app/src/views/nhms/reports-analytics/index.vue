<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const currentTab = ref("overview");

const kpiData = ref([
  {
    title: "Average Occupancy Rate",
    value: "93.3%",
    trend: "+2.1%",
    icon: "tabler-bed",
    color: "success",
  },
  {
    title: "Resident Satisfaction",
    value: "4.7/5",
    trend: "+0.3",
    icon: "tabler-mood-smile",
    color: "primary",
  },
  {
    title: "Staff-to-Resident Ratio",
    value: "1:4.2",
    trend: "Optimal",
    icon: "tabler-users",
    color: "info",
  },
  {
    title: "Incident Rate",
    value: "0.8%",
    trend: "-0.2%",
    icon: "tabler-alert-circle",
    color: "warning",
  },
]);

const careQualityMetrics = ref([
  { metric: "Medication Accuracy", score: 99.2, target: 98, status: "success" },
  {
    metric: "Fall Prevention Compliance",
    score: 95.5,
    target: 95,
    status: "success",
  },
  { metric: "Nutrition Goals Met", score: 92.8, target: 90, status: "success" },
  {
    metric: "Care Plan Updates (On Time)",
    score: 88.5,
    target: 90,
    status: "warning",
  },
]);

const recentReports = ref([
  {
    id: 1,
    title: "Monthly Care Quality Report",
    date: "2026-01-01",
    type: "Care Quality",
  },
  {
    id: 2,
    title: "Q4 2025 Financial Summary",
    date: "2026-01-05",
    type: "Financial",
  },
  { id: 3, title: "Staff Performance Review", date: "2026-01-08", type: "HR" },
]);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="overview">
          <VIcon icon="tabler-chart-bar" size="20" start />
          Overview
        </VTab>
        <VTab value="reports">
          <VIcon icon="tabler-file-analytics" size="20" start />
          Reports
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <VWindowItem value="overview">
          <VRow>
            <VCol
              v-for="kpi in kpiData"
              :key="kpi.title"
              cols="12"
              sm="6"
              md="3"
            >
              <VCard>
                <VCardText>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <VAvatar :color="kpi.color" variant="tonal" size="42">
                      <VIcon :icon="kpi.icon" size="24" />
                    </VAvatar>
                    <VChip size="small" :color="kpi.color" variant="tonal">
                      {{ kpi.trend }}
                    </VChip>
                  </div>
                  <p class="text-sm text-medium-emphasis mb-1">
                    {{ kpi.title }}
                  </p>
                  <h4 class="text-h4">{{ kpi.value }}</h4>
                </VCardText>
              </VCard>
            </VCol>

            <VCol cols="12">
              <VCard>
                <VCardItem>
                  <VCardTitle>Care Quality Metrics</VCardTitle>
                </VCardItem>
                <VDivider />
                <VCardText>
                  <VList class="py-0">
                    <VListItem
                      v-for="metric in careQualityMetrics"
                      :key="metric.metric"
                    >
                      <VListItemTitle class="mb-2">{{
                        metric.metric
                      }}</VListItemTitle>
                      <VListItemSubtitle>
                        <div class="d-flex align-center gap-3">
                          <VProgressLinear
                            :model-value="metric.score"
                            :color="metric.status"
                            height="8"
                            rounded
                          />
                          <span class="text-sm font-weight-medium"
                            >{{ metric.score }}%</span
                          >
                        </div>
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VWindowItem>

        <VWindowItem value="reports">
          <VCard>
            <VCardItem>
              <VCardTitle>Generated Reports</VCardTitle>
              <template #append>
                <VBtn color="primary" prepend-icon="tabler-download">
                  Export Reports
                </VBtn>
              </template>
            </VCardItem>
            <VDivider />
            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem v-for="report in recentReports" :key="report.id">
                  <template #prepend>
                    <VAvatar color="secondary" variant="tonal">
                      <VIcon icon="tabler-file-text" />
                    </VAvatar>
                  </template>
                  <VListItemTitle>{{ report.title }}</VListItemTitle>
                  <VListItemSubtitle>
                    {{ report.type }} • {{ report.date }}
                  </VListItemSubtitle>
                  <template #append>
                    <VBtn size="small" icon variant="text">
                      <VIcon icon="tabler-download" />
                    </VBtn>
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
