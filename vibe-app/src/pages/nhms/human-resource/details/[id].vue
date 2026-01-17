<script setup lang="ts">
import {
  EmployeeStatus,
  EmployeeType,
  ShiftType,
  Gender,
  MaritalStatus,
} from "@/types/nhms/human-resource";
import { DEFAULT_EMPLOYEE_FORM, EMPLOYEE_DETAIL_TABS } from "../consts";
import EmployeeBioCard from "./components/EmployeeBioCard.vue";
import EmployeeStatsCard from "./components/EmployeeStatsCard.vue";
import PersonalInfoForm from "./components/PersonalInfoForm.vue";
import EmploymentInfoForm from "./components/EmploymentInfoForm.vue";
import CertificationsManager from "./components/CertificationsManager.vue";
import PerformanceForm from "./components/PerformanceForm.vue";
import DocumentsManager from "./components/DocumentsManager.vue";
import EmergencyContactForm from "./components/EmergencyContactForm.vue";
import BankInfoForm from "./components/BankInfoForm.vue";
import AttendanceForm from "./components/AttendanceForm.vue";

definePage({
  meta: {
    subject: "nhms-hr",
    action: "read",
  },
});

const route = useRoute();
const router = useRouter();
const employeeId = computed(() => (route.params as { id: string }).id);
const isNewEmployee = computed(() => employeeId.value === "new");
const currentTab = ref(0);

// Form data
const employeeData = ref<any>({ ...DEFAULT_EMPLOYEE_FORM });

// Load mock data for existing employee
onMounted(() => {
  if (!isNewEmployee.value) {
    employeeData.value = {
      id: 1,
      employeeId: "EMP0001",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@nhms.com",
      phone: "+1 234-567-8900",
      dateOfBirth: "1985-05-15",
      gender: Gender.Female,
      maritalStatus: MaritalStatus.Married,
      address: "123 Medical Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      role: "Medical Director",
      department: "Medical",
      employeeType: EmployeeType.FullTime,
      shiftType: ShiftType.Day,
      hireDate: "2022-01-15",
      salary: 125000,
      status: EmployeeStatus.Active,
      supervisor: "Dr. Michael Smith",
      certifications: [
        {
          name: "Medical Doctor (MD)",
          issueDate: "2010-06-01",
          expiryDate: "N/A",
          status: "Active",
          issuingAuthority: "Medical Board",
        },
      ],
      emergencyName: "John Johnson",
      emergencyRelation: "Spouse",
      emergencyPhone: "+1 234-567-8901",
      emergencyAddress: "123 Medical Plaza, New York, NY 10001",
      bankName: "Chase Bank",
      accountNumber: "****5678",
      routingNumber: "021000021",
      documents: [
        {
          name: "Resume.pdf",
          type: "Resume",
          uploadDate: "2022-01-10",
          size: "2.5 MB",
        },
      ],
      performanceRating: 4.8,
      lastReviewDate: "2025-12-15",
      nextReviewDate: "2026-12-15",
      totalLeaveDays: 25,
      usedLeaveDays: 8,
      sickDays: 2,
    };
  }
});

const employeeForBio = computed(() => {
  if (isNewEmployee.value) return null;

  return {
    id: employeeData.value.id,
    employeeId: employeeData.value.employeeId,
    firstName: employeeData.value.firstName,
    lastName: employeeData.value.lastName,
    fullName: `${employeeData.value.firstName} ${employeeData.value.lastName}`,
    email: employeeData.value.email,
    phone: employeeData.value.phone,
    role: employeeData.value.role,
    department: employeeData.value.department,
    status: employeeData.value.status,
    shiftType: employeeData.value.shiftType,
    hireDate: employeeData.value.hireDate,
    performance: {
      rating: employeeData.value.performanceRating,
      lastReviewDate: employeeData.value.lastReviewDate,
      nextReviewDate: employeeData.value.nextReviewDate,
    },
    attendance: {
      totalLeaveDays: employeeData.value.totalLeaveDays,
      usedLeaveDays: employeeData.value.usedLeaveDays,
      sickDays: employeeData.value.sickDays,
    },
  };
});

const onSubmit = () => {
  console.log("Saving employee:", employeeData.value);
  router.push({ name: "nhms-human-resource-list" });
};

const deleteEmployee = () => {
  console.log("Deleting employee:", employeeData.value);
  router.push({ name: "nhms-human-resource-list" });
};
</script>

<template>
  <div>
    <!-- Header -->
    <VCard class="mb-6">
      <VCardText>
        <div class="d-flex justify-space-between align-center flex-wrap gap-3">
          <div>
            <h2 class="text-h4 mb-1">
              {{
                isNewEmployee
                  ? "Add New Employee"
                  : `${employeeData.firstName} ${employeeData.lastName}`
              }}
            </h2>
            <p class="text-body-1 text-medium-emphasis">
              {{
                isNewEmployee
                  ? "Create new employee record"
                  : `Employee ID: ${
                      employeeData.employeeId
                    } • Joined: ${new Date(
                      employeeData.hireDate
                    ).toLocaleDateString()}`
              }}
            </p>
          </div>
          <div class="d-flex gap-3">
            <VBtn
              variant="tonal"
              prepend-icon="tabler-arrow-left"
              :to="{ name: 'nhms-human-resource-list' }"
            >
              Back
            </VBtn>
            <VBtn
              v-if="!isNewEmployee"
              color="error"
              variant="tonal"
              prepend-icon="tabler-trash"
              @click="deleteEmployee"
            >
              Delete
            </VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Content -->
    <VRow>
      <!-- Left Column - Bio Card -->
      <VCol v-if="!isNewEmployee" cols="12" md="4" lg="3">
        <EmployeeBioCard
          v-if="employeeForBio"
          :employee="employeeForBio as any"
        />
        <EmployeeStatsCard
          v-if="employeeForBio"
          :employee="employeeForBio as any"
          class="mt-6"
        />
      </VCol>

      <!-- Right Column - Tabs -->
      <VCol cols="12" :md="isNewEmployee ? 12 : 8" :lg="isNewEmployee ? 12 : 9">
        <VCard>
          <VTabs
            v-if="!isNewEmployee"
            v-model="currentTab"
            class="v-tabs-pill py-6 px-6"
          >
            <VTab v-for="tab in EMPLOYEE_DETAIL_TABS" :key="tab.title">
              <VIcon :icon="tab.icon" size="20" start />
              {{ tab.title }}
            </VTab>
          </VTabs>

          <VDivider v-if="!isNewEmployee" />

          <VCardText>
            <VForm @submit.prevent="onSubmit">
              <VWindow v-model="currentTab" :touch="false">
                <!-- Overview Tab -->
                <VWindowItem :value="0">
                  <h5 class="text-h5 mb-4">Personal Information</h5>
                  <PersonalInfoForm v-model="employeeData" />

                  <VDivider class="my-6" />

                  <h5 class="text-h5 mb-4">Emergency Contact</h5>
                  <EmergencyContactForm v-model="employeeData" />
                </VWindowItem>

                <!-- Employment Tab -->
                <VWindowItem :value="1">
                  <h5 class="text-h5 mb-4">Employment Information</h5>
                  <EmploymentInfoForm v-model="employeeData" />
                </VWindowItem>

                <!-- Certifications Tab -->
                <VWindowItem :value="2">
                  <CertificationsManager
                    v-model="employeeData.certifications"
                  />
                </VWindowItem>

                <!-- Performance Tab -->
                <VWindowItem :value="3">
                  <h5 class="text-h5 mb-4">Performance Review</h5>
                  <PerformanceForm v-model="employeeData" />

                  <VDivider class="my-6" />

                  <h5 class="text-h5 mb-4">Attendance & Leave</h5>
                  <AttendanceForm v-model="employeeData" />
                </VWindowItem>

                <!-- Documents Tab -->
                <VWindowItem :value="4">
                  <DocumentsManager v-model="employeeData.documents" />
                </VWindowItem>

                <!-- Payroll Tab -->
                <VWindowItem :value="5">
                  <h5 class="text-h5 mb-4">Bank Information</h5>
                  <BankInfoForm v-model="employeeData" />

                  <VDivider class="my-6" />

                  <VRow>
                    <VCol cols="12" md="6">
                      <VCard>
                        <VCardText>
                          <h6 class="text-h6 mb-2">Current Salary</h6>
                          <h3 class="text-h3 text-success">
                            ${{ employeeData.salary?.toLocaleString() || 0 }}
                          </h3>
                          <p class="text-body-2 text-medium-emphasis">
                            Per year
                          </p>
                        </VCardText>
                      </VCard>
                    </VCol>
                  </VRow>
                </VWindowItem>
              </VWindow>

              <VDivider class="my-6" />

              <!-- Actions -->
              <div class="d-flex justify-end gap-3">
                <VBtn
                  variant="tonal"
                  color="secondary"
                  :to="{ name: 'nhms-human-resource-list' }"
                >
                  Cancel
                </VBtn>
                <VBtn type="submit" color="primary">
                  {{ isNewEmployee ? "Create Employee" : "Save Changes" }}
                </VBtn>
              </div>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
