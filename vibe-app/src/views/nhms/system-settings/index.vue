<script setup lang="ts">
definePage({
  meta: {
    action: "manage",
    subject: "SystemSettings",
  },
});

const tabsData = [
  { icon: "tabler-settings", title: "General Settings", value: "general" },
  { icon: "tabler-users", title: "User Management", value: "users" },
  { icon: "tabler-shield-lock", title: "Access Control", value: "access" },
  { icon: "tabler-database", title: "Data Backup", value: "backup" },
];

const activeTab = ref("general");

const userRoles = ref([
  { role: "Admin", users: 2, permissions: "Full Access" },
  { role: "Nurse", users: 15, permissions: "Care & Medical Records" },
  { role: "Doctor", users: 3, permissions: "Medical Records & Prescriptions" },
  { role: "Family Member", users: 42, permissions: "View Only" },
]);

const backupHistory = ref([
  { date: "2026-01-12", time: "02:00 AM", size: "2.4 GB", status: "Success" },
  { date: "2026-01-11", time: "02:00 AM", size: "2.3 GB", status: "Success" },
  { date: "2026-01-10", time: "02:00 AM", size: "2.3 GB", status: "Success" },
]);
</script>

<template>
  <VRow>
    <VCol cols="12" md="3">
      <VCard>
        <VCardText>
          <h5 class="text-h5 mb-4">System Settings</h5>
          <p class="text-sm text-medium-emphasis mb-6">
            Configure and manage system settings
          </p>

          <VList class="py-0">
            <VListItem
              v-for="tab in tabsData"
              :key="tab.value"
              :active="activeTab === tab.value"
              @click="activeTab = tab.value"
            >
              <template #prepend>
                <VIcon :icon="tab.icon" size="20" />
              </template>
              <VListItemTitle>{{ tab.title }}</VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="9">
      <VWindow v-model="activeTab">
        <VWindowItem value="general">
          <VCard>
            <VCardItem>
              <VCardTitle>General Settings</VCardTitle>
            </VCardItem>
            <VDivider />
            <VCardText>
              <VRow>
                <VCol cols="12">
                  <VTextField
                    label="Facility Name"
                    model-value="Sunshine Nursing Home"
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField label="Email" model-value="info@sunshinenh.com" />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField label="Phone" model-value="+1 (555) 123-4567" />
                </VCol>
                <VCol cols="12">
                  <VTextarea
                    label="Address"
                    model-value="123 Care Street, Medical City, MC 12345"
                  />
                </VCol>
                <VCol cols="12">
                  <VBtn color="primary">Save Changes</VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VWindowItem>

        <VWindowItem value="users">
          <VCard>
            <VCardItem>
              <VCardTitle>User Roles & Permissions</VCardTitle>
            </VCardItem>
            <VDivider />
            <VCardText class="pa-0">
              <VList class="py-0">
                <VListItem v-for="role in userRoles" :key="role.role">
                  <VListItemTitle class="font-weight-medium mb-1">
                    {{ role.role }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    <div>{{ role.users }} active users</div>
                    <div>{{ role.permissions }}</div>
                  </VListItemSubtitle>
                  <template #append>
                    <VBtn size="small" variant="text" icon>
                      <VIcon icon="tabler-edit" />
                    </VBtn>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VWindowItem>

        <VWindowItem value="access">
          <VCard>
            <VCardItem>
              <VCardTitle>Access Control</VCardTitle>
            </VCardItem>
            <VDivider />
            <VCardText>
              <VRow>
                <VCol cols="12">
                  <VCheckbox
                    label="Enable Two-Factor Authentication"
                    model-value
                  />
                </VCol>
                <VCol cols="12">
                  <VCheckbox label="Require Strong Passwords" model-value />
                </VCol>
                <VCol cols="12">
                  <VCheckbox label="Log All User Activities" model-value />
                </VCol>
                <VCol cols="12">
                  <VBtn color="primary">Update Security Settings</VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VWindowItem>

        <VWindowItem value="backup">
          <VCard>
            <VCardItem>
              <VCardTitle>Data Backup & Recovery</VCardTitle>
              <template #append>
                <VBtn color="primary" size="small"> Backup Now </VBtn>
              </template>
            </VCardItem>
            <VDivider />
            <VCardText>
              <VRow class="mb-4">
                <VCol cols="12" md="6">
                  <VSelect
                    label="Backup Frequency"
                    :items="['Daily', 'Weekly', 'Monthly']"
                    model-value="Daily"
                  />
                </VCol>
                <VCol cols="12" md="6">
                  <VTextField label="Backup Time" model-value="02:00 AM" />
                </VCol>
              </VRow>

              <p class="text-sm font-weight-medium mb-2">Backup History</p>
              <VList class="py-0" density="compact">
                <VListItem v-for="backup in backupHistory" :key="backup.date">
                  <VListItemTitle class="text-sm">
                    {{ backup.date }} at {{ backup.time }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-xs">
                    Size: {{ backup.size }}
                  </VListItemSubtitle>
                  <template #append>
                    <VChip color="success" size="x-small">
                      {{ backup.status }}
                    </VChip>
                  </template>
                </VListItem>
              </VList>
            </VCardText>
          </VCard>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <VCol cols="12" md="9">
    <VTabs v-model="activeTab" direction="vertical" class="v-tabs-pill">
      <VTab v-for="tab in tabsData" :key="tab.icon">
        <VIcon :icon="tab.icon" size="20" start />
        {{ tab.title }}
      </VTab>
    </VTabs>
  </VCol>

  <VCol cols="12" md="8">
    <VWindow v-model="activeTab" class="disable-tab-transition" :touch="false">
      <VWindowItem v-for="(tab, index) in tabsData" :key="index">
        <VCard>
          <VCardText>
            <h6 class="text-h6 mb-4">
              {{ tab.title }}
            </h6>
            <p>{{ tab.title }} configuration will be displayed here</p>
          </VCardText>
        </VCard>
      </VWindowItem>
    </VWindow>
  </VCol>
</template>
