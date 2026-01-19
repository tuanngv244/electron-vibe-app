<script setup lang="ts">
import type { EmployeeStats } from '@/types/nhms/human-resource';

interface Props {
  stats: EmployeeStats;
}

const props = defineProps<Props>();

const statItems = computed(() => [
  {
    title: 'Total Employees',
    value: props.stats.total,
    icon: 'tabler-users',
    color: 'primary',
  },
  {
    title: 'Active Staff',
    value: props.stats.active,
    icon: 'tabler-user-check',
    color: 'success',
  },
  {
    title: 'Full-Time',
    value: props.stats.fullTime,
    icon: 'tabler-briefcase',
    color: 'info',
  },
  {
    title: 'Avg Rating',
    value: props.stats.avgRating,
    icon: 'tabler-star',
    color: 'warning',
  },
]);
</script>

<template>
  <VRow class="mb-4">
    <VCol v-for="stat in statItems" :key="stat.title" cols="12" sm="6" md="3">
      <VCard>
        <VCardText class="d-flex align-center px-6 py-6">
          <VAvatar :color="stat.color" variant="tonal" size="42" class="me-4">
            <VIcon :icon="stat.icon" size="24" />
          </VAvatar>
          <div>
            <h6 class="text-h5">
              {{ stat.value }}
            </h6>
            <span class="text-sm">{{ stat.title }}</span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
