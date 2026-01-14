<script lang="ts" setup>
import EcommerceCongratulationsJohn from '@/views/base-ui/dashboards/ecommerce/EcommerceCongratulationsJohn.vue'
import EcommerceEarningReports from '@/views/base-ui/dashboards/ecommerce/EcommerceEarningReports.vue'
import EcommerceExpensesRadialBarCharts from '@/views/base-ui/dashboards/ecommerce/EcommerceExpensesRadialBarCharts.vue'
import EcommerceGeneratedLeads from '@/views/base-ui/dashboards/ecommerce/EcommerceGeneratedLeads.vue'
import EcommerceInvoiceTable from '@/views/base-ui/dashboards/ecommerce/EcommerceInvoiceTable.vue'
import EcommerceOrder from '@/views/base-ui/dashboards/ecommerce/EcommerceOrder.vue'
import EcommercePopularProducts from '@/views/base-ui/dashboards/ecommerce/EcommercePopularProducts.vue'
import EcommerceRevenueReport from '@/views/base-ui/dashboards/ecommerce/EcommerceRevenueReport.vue'
import EcommerceStatistics from '@/views/base-ui/dashboards/ecommerce/EcommerceStatistics.vue'
import EcommerceTotalProfitLineCharts from '@/views/base-ui/dashboards/ecommerce/EcommerceTotalProfitLineCharts.vue'
import EcommerceTransactions from '@/views/base-ui/dashboards/ecommerce/EcommerceTransactions.vue'
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Congratulation John -->
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <EcommerceCongratulationsJohn />
    </VCol>

    <!-- 👉 Ecommerce Transition -->
    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <EcommerceStatistics class="h-100" />
    </VCol>

    <VCol
      cols="12"
      lg="4"
    >
      <VRow>
        <!-- 👉 Total Profit Line -->
        <VCol
          cols="12"
          lg="6"
          md="3"
          sm="6"
        >
          <EcommerceTotalProfitLineCharts />
        </VCol>

        <!-- 👉 Expenses Radial Bar Charts -->
        <VCol
          cols="12"
          lg="6"
          md="3"
          sm="6"
        >
          <EcommerceExpensesRadialBarCharts />
        </VCol>

        <!-- 👉 Generated Leads -->
        <VCol
          cols="12"
          md="6"
          lg="12"
        >
          <EcommerceGeneratedLeads />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Revenue Report -->
    <VCol
      cols="12"
      lg="8"
    >
      <EcommerceRevenueReport />
    </VCol>

    <!-- 👉 Earning Reports -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceEarningReports />
    </VCol>

    <!-- 👉 Popular Products -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommercePopularProducts />
    </VCol>

    <!-- 👉 Order -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceOrder />
    </VCol>

    <!-- 👉 Transaction -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <EcommerceTransactions />
    </VCol>

    <!-- 👉 Invoice Table -->
    <VCol
      cols="12"
      lg="8"
    >
      <EcommerceInvoiceTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
