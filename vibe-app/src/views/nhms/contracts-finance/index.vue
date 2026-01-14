<script setup lang="ts">
definePage({
  meta: {
    action: "read",
    subject: "NursingHome",
  },
});

const currentTab = ref("contracts");

const contracts = ref([
  {
    id: 1,
    resident: "Mary Johnson",
    room: "201A",
    package: "Standard Care",
    startDate: "2024-06-15",
    endDate: "2026-06-14",
    monthlyFee: 3500,
    status: "Active",
  },
  {
    id: 2,
    resident: "Robert Smith",
    room: "305B",
    package: "Medical Care",
    startDate: "2023-11-20",
    endDate: "2025-11-19",
    monthlyFee: 3800,
    status: "Active",
  },
]);

const invoices = ref([
  {
    id: "INV-2026-001",
    resident: "Mary Johnson",
    month: "January 2026",
    amount: 3500,
    dueDate: "2026-01-31",
    status: "Paid",
    paidDate: "2026-01-01",
  },
  {
    id: "INV-2026-002",
    resident: "Robert Smith",
    month: "January 2026",
    amount: 3800,
    dueDate: "2026-01-31",
    status: "Pending",
    paidDate: null,
  },
]);

const getStatusColor = (status: string) => {
  return status === "Paid"
    ? "success"
    : status === "Pending"
    ? "warning"
    : "error";
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTabs v-model="currentTab" class="v-tabs-pill">
        <VTab value="contracts">
          <VIcon icon="tabler-file-text" size="20" start />
          Contracts
        </VTab>
        <VTab value="invoices">
          <VIcon icon="tabler-file-invoice" size="20" start />
          Invoices
        </VTab>
      </VTabs>

      <VWindow v-model="currentTab" class="mt-6">
        <VWindowItem value="contracts">
          <VCard>
            <VCardItem>
              <VCardTitle>Active Contracts</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem v-for="contract in contracts" :key="contract.id">
                  <VListItemTitle class="font-weight-medium mb-1">
                    {{ contract.resident }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    <div>
                      Room: {{ contract.room }} • {{ contract.package }}
                    </div>
                    <div>
                      Period: {{ contract.startDate }} - {{ contract.endDate }}
                    </div>
                    <div class="text-success font-weight-medium mt-1">
                      ${{ contract.monthlyFee.toLocaleString() }}/month
                    </div>
                  </VListItemSubtitle>

                  <template #append>
                    <VChip
                      :color="getStatusColor(contract.status)"
                      size="small"
                    >
                      {{ contract.status }}
                    </VChip>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VWindowItem>

        <VWindowItem value="invoices">
          <VCard>
            <VCardItem>
              <VCardTitle>Invoices & Payments</VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem v-for="invoice in invoices" :key="invoice.id">
                  <VListItemTitle class="font-weight-medium mb-1">
                    {{ invoice.id }} - {{ invoice.resident }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    <div>{{ invoice.month }}</div>
                    <div>Due: {{ invoice.dueDate }}</div>
                    <div v-if="invoice.paidDate">
                      Paid: {{ invoice.paidDate }}
                    </div>
                  </VListItemSubtitle>

                  <template #append>
                    <div class="text-end">
                      <div class="text-h6 text-primary mb-1">
                        ${{ invoice.amount.toLocaleString() }}
                      </div>
                      <VChip
                        :color="getStatusColor(invoice.status)"
                        size="x-small"
                      >
                        {{ invoice.status }}
                      </VChip>
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
