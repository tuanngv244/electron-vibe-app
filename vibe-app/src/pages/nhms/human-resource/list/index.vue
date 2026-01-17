<script setup lang="ts">
import type {
  Employee,
  EmployeeListFilters,
  EmployeeStats,
} from "@/types/nhms/human-resource";
import {
  EmployeeStatus,
  EmployeeType,
  ShiftType,
} from "@/types/nhms/human-resource";
import {
  EMPLOYEE_TABLE_HEADERS,
  STATUS_VARIANT_MAP,
  EMPLOYEE_TYPE_COLOR_MAP,
} from "../consts";
import EmployeeStatsRow from "./components/EmployeeStatsRow.vue";
import EmployeeFilters from "./components/EmployeeFilters.vue";
import EmployeeListHeader from "./components/EmployeeListHeader.vue";

definePage({
  meta: {
    subject: "nhms-hr",
    action: "read",
  },
});

const filters = ref<EmployeeListFilters>({
  searchQuery: "",
  role: "",
  department: "",
  status: "",
  employeeType: "",
  shiftType: "",
});

const itemsPerPage = ref(10);
const page = ref(1);
const selectedRows = ref<number[]>([]);

const employees = ref<Employee[]>([
  {
    id: 1,
    employeeId: "EMP0001",
    firstName: "Sarah",
    lastName: "Johnson",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.j@nhms.com",
    phone: "+1 234-567-8900",
    role: "Medical Director",
    department: "Medical",
    employeeType: EmployeeType.FullTime,
    status: EmployeeStatus.Active,
    hireDate: "2022-01-15",
    salary: 125000,
    shiftType: ShiftType.Day,
    performance: {
      rating: 4.8,
      lastReviewDate: "2024-01-15",
      nextReviewDate: "2025-01-15",
    },
    attendance: {
      totalLeaveDays: 20,
      usedLeaveDays: 5,
      sickDays: 2,
    },
    dateOfBirth: "1985-03-15",
    gender: "Female" as any,
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    country: "USA",
    maritalStatus: "Single" as any,
    certifications: [],
    documents: [],
    emergencyContact: {
      name: "John Johnson",
      relation: "Spouse",
      phone: "+1 234-567-8901",
      address: "123 Main St, Springfield, IL 62701",
    },
  },
  {
    id: 2,
    employeeId: "EMP0002",
    firstName: "Emily",
    lastName: "Rodriguez",
    fullName: "Emily Rodriguez",
    email: "emily.r@nhms.com",
    phone: "+1 234-567-8901",
    role: "Registered Nurse",
    department: "Nursing",
    employeeType: EmployeeType.FullTime,
    status: EmployeeStatus.Active,
    hireDate: "2023-03-20",
    salary: 68000,
    shiftType: ShiftType.Night,
    performance: {
      rating: 4.5,
      lastReviewDate: "2024-03-20",
      nextReviewDate: "2025-03-20",
    },
    attendance: {
      totalLeaveDays: 15,
      usedLeaveDays: 3,
      sickDays: 1,
    },
    dateOfBirth: "1990-06-20",
    gender: "Female" as any,
    address: "456 Oak Ave",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    country: "USA",
    maritalStatus: "Married" as any,
    certifications: [],
    documents: [],
    emergencyContact: {
      name: "Carlos Rodriguez",
      relation: "Spouse",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, Springfield, IL 62702",
    },
  },
  {
    id: 3,
    employeeId: "EMP0003",
    firstName: "Michael",
    lastName: "Chen",
    fullName: "Michael Chen",
    email: "michael.c@nhms.com",
    phone: "+1 234-567-8902",
    role: "Certified Nursing Assistant",
    department: "Care Services",
    employeeType: EmployeeType.PartTime,
    status: EmployeeStatus.Active,
    hireDate: "2023-06-10",
    salary: 35000,
    shiftType: ShiftType.Evening,
    performance: {
      rating: 4.2,
      lastReviewDate: "2024-06-10",
      nextReviewDate: "2025-06-10",
    },
    attendance: {
      totalLeaveDays: 10,
      usedLeaveDays: 2,
      sickDays: 0,
    },
    dateOfBirth: "1995-09-12",
    gender: "Male" as any,
    address: "789 Pine Rd",
    city: "Springfield",
    state: "IL",
    zipCode: "62703",
    country: "USA",
    maritalStatus: "Single" as any,
    certifications: [],
    documents: [],
    emergencyContact: {
      name: "Linda Chen",
      relation: "Mother",
      phone: "+1 234-567-8903",
      address: "789 Pine Rd, Springfield, IL 62703",
    },
  },
  {
    id: 4,
    employeeId: "EMP0004",
    firstName: "Jessica",
    lastName: "Taylor",
    fullName: "Jessica Taylor",
    email: "jessica.t@nhms.com",
    phone: "+1 234-567-8903",
    role: "Physical Therapist",
    department: "Rehabilitation",
    employeeType: EmployeeType.FullTime,
    status: EmployeeStatus.OnLeave,
    hireDate: "2022-09-05",
    salary: 72000,
    shiftType: ShiftType.Day,
    performance: {
      rating: 4.6,
      lastReviewDate: "2024-09-05",
      nextReviewDate: "2025-09-05",
    },
    attendance: {
      totalLeaveDays: 20,
      usedLeaveDays: 15,
      sickDays: 3,
    },
    dateOfBirth: "1988-11-25",
    gender: "Female" as any,
    address: "321 Elm St",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    country: "USA",
    maritalStatus: "Married" as any,
    certifications: [],
    documents: [],
    emergencyContact: {
      name: "David Taylor",
      relation: "Spouse",
      phone: "+1 234-567-8904",
      address: "321 Elm St, Springfield, IL 62704",
    },
  },
  {
    id: 5,
    employeeId: "EMP0005",
    firstName: "Robert",
    lastName: "Williams",
    fullName: "Robert Williams",
    email: "robert.w@nhms.com",
    phone: "+1 234-567-8904",
    role: "Activities Coordinator",
    department: "Recreation",
    employeeType: EmployeeType.FullTime,
    status: EmployeeStatus.Active,
    hireDate: "2021-11-30",
    salary: 45000,
    shiftType: ShiftType.Day,
    performance: {
      rating: 4.3,
      lastReviewDate: "2023-11-30",
      nextReviewDate: "2024-11-30",
    },
    attendance: {
      totalLeaveDays: 18,
      usedLeaveDays: 6,
      sickDays: 1,
    },
    dateOfBirth: "1992-04-08",
    gender: "Male" as any,
    address: "654 Maple Dr",
    city: "Springfield",
    state: "IL",
    zipCode: "62705",
    country: "USA",
    maritalStatus: "Single" as any,
    certifications: [],
    documents: [],
    emergencyContact: {
      name: "Mary Williams",
      relation: "Mother",
      phone: "+1 234-567-8905",
      address: "654 Maple Dr, Springfield, IL 62705",
    },
  },
]);

const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const matchesSearch =
      emp.fullName
        .toLowerCase()
        .includes(filters.value.searchQuery?.toLowerCase() || "") ||
      emp.email
        .toLowerCase()
        .includes(filters.value.searchQuery?.toLowerCase() || "");
    const matchesRole = !filters.value.role || emp.role === filters.value.role;
    const matchesDepartment =
      !filters.value.department || emp.department === filters.value.department;
    const matchesStatus =
      !filters.value.status || emp.status === filters.value.status;
    const matchesType =
      !filters.value.employeeType ||
      emp.employeeType === filters.value.employeeType;
    const matchesShift =
      !filters.value.shiftType || emp.shiftType === filters.value.shiftType;

    return (
      matchesSearch &&
      matchesRole &&
      matchesDepartment &&
      matchesStatus &&
      matchesType &&
      matchesShift
    );
  });
});

const deleteEmployee = (employeeId: number) => {
  const index = employees.value.findIndex((e) => e.id === employeeId);
  if (index !== -1) employees.value.splice(index, 1);
};

// Statistics
const stats = computed<EmployeeStats>(() => {
  return {
    total: employees.value.length,
    active: employees.value.filter((e) => e.status === EmployeeStatus.Active)
      .length,
    fullTime: employees.value.filter(
      (e) => e.employeeType === EmployeeType.FullTime
    ).length,
    avgRating: (
      employees.value.reduce((sum, e) => sum + e.performance.rating, 0) /
      employees.value.length
    ).toFixed(1),
  };
});
</script>

<template>
  <div>
    <!-- Statistics Cards -->
    <EmployeeStatsRow :stats="stats" />

    <!-- Main Card -->
    <VCard>
      <EmployeeListHeader />

      <VDivider />

      <!-- Filters -->
      <VCardText>
        <EmployeeFilters v-model="filters" />
      </VCardText>

      <VDivider />

      <!-- Data Table -->
      <VDataTable
        v-model="selectedRows"
        :headers="EMPLOYEE_TABLE_HEADERS"
        :items="filteredEmployees"
        :items-per-page="itemsPerPage"
        :page="page"
        show-select
      >
        <template #item.employee="{ item }">
          <div class="d-flex align-center gap-3 py-3">
            <VAvatar
              :size="38"
              :color="item.avatar ? undefined : 'primary'"
              :variant="item.avatar ? undefined : 'tonal'"
            >
              <VImg v-if="item.avatar" :src="item.avatar" />
              <span v-else>{{
                item.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}</span>
            </VAvatar>
            <div>
              <h6 class="text-h6 font-weight-medium">
                {{ item.fullName }}
              </h6>
              <span class="text-xs text-medium-emphasis"
                >ID: EMP{{ String(item.id).padStart(4, "0") }}</span
              >
            </div>
          </div>
        </template>

        <template #item.contact="{ item }">
          <div class="d-flex flex-column gap-1">
            <span class="text-body-2">{{ item.email }}</span>
            <span class="text-xs text-medium-emphasis">{{ item.phone }}</span>
          </div>
        </template>

        <template #item.roleInfo="{ item }">
          <div class="d-flex flex-column gap-1">
            <span class="font-weight-medium">{{ item.role }}</span>
            <span class="text-xs text-medium-emphasis">{{
              item.department
            }}</span>
          </div>
        </template>

        <template #item.employmentInfo="{ item }">
          <div class="d-flex flex-column gap-1">
            <VChip
              :color="EMPLOYEE_TYPE_COLOR_MAP[item.employeeType]"
              size="x-small"
            >
              {{ item.employeeType }}
            </VChip>
            <span class="text-xs text-medium-emphasis"
              >{{ item.shiftType }} Shift</span
            >
          </div>
        </template>

        <template #item.status="{ item }">
          <VChip :color="STATUS_VARIANT_MAP[item.status]" size="small">
            {{ item.status }}
          </VChip>
        </template>

        <template #item.performance="{ item }">
          <div class="d-flex align-center gap-2">
            <VRating
              :model-value="item.performance.rating"
              readonly
              density="compact"
              size="small"
              color="warning"
            />
            <span class="text-body-2 font-weight-medium">{{
              item.performance.rating
            }}</span>
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <VBtn
              icon
              variant="text"
              size="small"
              :to="{
                name: 'nhms-human-resource-details-id',
                params: { id: item.id },
              }"
            >
              <VIcon icon="tabler-eye" />
              <VTooltip activator="parent" location="top">
                View Details
              </VTooltip>
            </VBtn>
            <VBtn
              icon
              variant="text"
              size="small"
              color="error"
              @click="deleteEmployee(item.id)"
            >
              <VIcon icon="tabler-trash" />
              <VTooltip activator="parent" location="top"> Delete </VTooltip>
            </VBtn>
          </div>
        </template>

        <template #bottom>
          <VDivider />
          <div
            class="d-flex justify-space-between align-center pa-4 flex-wrap gap-3"
          >
            <span class="text-sm text-medium-emphasis">
              Showing {{ (page - 1) * itemsPerPage + 1 }} to
              {{ Math.min(page * itemsPerPage, filteredEmployees.length) }} of
              {{ filteredEmployees.length }} entries
            </span>
            <VPagination
              v-model="page"
              :length="Math.ceil(filteredEmployees.length / itemsPerPage)"
              total-visible="5"
            />
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>
