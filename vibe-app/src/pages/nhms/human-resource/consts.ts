import type { EmployeeStatus, EmployeeType, ShiftType } from '@/types/nhms/human-resource'

// Role options for nursing home
export const ROLES = [
    'Medical Director',
    'Registered Nurse',
    'Licensed Practical Nurse',
    'Certified Nursing Assistant',
    'Physical Therapist',
    'Occupational Therapist',
    'Speech Therapist',
    'Activities Coordinator',
    'Social Worker',
    'Dietitian',
    'Administrator',
    'Receptionist',
    'Housekeeping Staff',
    'Maintenance Worker',
    'Cook',
] as const

export const DEPARTMENTS = [
    'Medical',
    'Nursing',
    'Care Services',
    'Rehabilitation',
    'Therapy',
    'Recreation',
    'Dietary',
    'Administration',
    'Front Desk',
    'Housekeeping',
    'Maintenance',
    'Social Services',
] as const

export const COUNTRIES = [
    'USA',
    'Canada',
    'UK',
    'Australia',
] as const

// Status color mapping
export const STATUS_VARIANT_MAP: Record<EmployeeStatus, string> = {
    'Active': 'success',
    'On Leave': 'warning',
    'Inactive': 'error',
    'Probation': 'info',
}

// Employee type color mapping
export const EMPLOYEE_TYPE_COLOR_MAP: Record<EmployeeType, string> = {
    'Full-Time': 'primary',
    'Part-Time': 'info',
    'Contract': 'warning',
    'Per Diem': 'secondary',
}

// Table headers configuration
export const EMPLOYEE_TABLE_HEADERS = [
    { title: 'EMPLOYEE', key: 'employee' },
    { title: 'CONTACT', key: 'contact' },
    { title: 'ROLE & DEPARTMENT', key: 'roleInfo' },
    { title: 'TYPE & SHIFT', key: 'employmentInfo' },
    { title: 'STATUS', key: 'status' },
    { title: 'PERFORMANCE', key: 'performance' },
    { title: 'ACTIONS', key: 'actions', sortable: false },
] as const

// Document table headers
export const DOCUMENT_TABLE_HEADERS = [
    { title: 'Document Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Upload Date', key: 'uploadDate' },
    { title: 'Size', key: 'size' },
    { title: 'Actions', key: 'actions', sortable: false },
] as const

// Tabs configuration for employee details
export const EMPLOYEE_DETAIL_TABS = [
    { title: 'Overview', icon: 'tabler-user', value: 0 },
    { title: 'Employment', icon: 'tabler-briefcase', value: 1 },
    { title: 'Certifications', icon: 'tabler-certificate', value: 2 },
    { title: 'Performance', icon: 'tabler-chart-line', value: 3 },
    { title: 'Documents', icon: 'tabler-files', value: 4 },
    { title: 'Payroll', icon: 'tabler-cash', value: 5 },
] as const

// Default form values
export const DEFAULT_EMPLOYEE_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    maritalStatus: 'Single',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    employeeId: '',
    role: '',
    department: '',
    employeeType: 'Full-Time',
    shiftType: 'Day',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'Active',
    supervisor: '',
    certifications: [],
    documents: [],
    emergencyContact: {
        name: '',
        relation: '',
        phone: '',
        address: '',
    },
    bankInfo: {
        bankName: '',
        accountNumber: '',
        routingNumber: '',
    },
    performance: {
        rating: 0,
        lastReviewDate: '',
        nextReviewDate: '',
    },
    attendance: {
        totalLeaveDays: 20,
        usedLeaveDays: 0,
        sickDays: 0,
    },
} as const
