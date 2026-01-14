<script setup lang="ts">
import LogisticsCardStatistics from '@/views/base-ui/apps/logistics/LogisticsCardStatistics.vue'
import LogisticsDeliveryExpectations from '@/views/base-ui/apps/logistics/LogisticsDeliveryExpectations.vue'
import LogisticsDeliveryPerformance from '@/views/base-ui/apps/logistics/LogisticsDeliveryPerformance.vue'
import LogisticsOrderByCountries from '@/views/base-ui/apps/logistics/LogisticsOrderByCountries.vue'
import LogisticsOverviewTable from '@/views/base-ui/apps/logistics/LogisticsOverviewTable.vue'
import LogisticsShipmentStatistics from '@/views/base-ui/apps/logistics/LogisticsShipmentStatistics.vue'
import LogisticsVehicleOverview from '@/views/base-ui/apps/logistics/LogisticsVehicleOverview.vue'
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <LogisticsCardStatistics />
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <LogisticsVehicleOverview />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <LogisticsShipmentStatistics />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsDeliveryPerformance />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsDeliveryExpectations />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LogisticsOrderByCountries />
    </VCol>

    <VCol cols="12">
      <LogisticsOverviewTable />
    </VCol>
  </VRow>
</template>
