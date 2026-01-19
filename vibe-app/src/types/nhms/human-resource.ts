// Enums
export enum EmployeeStatus {
    Active = 'Active',
    OnLeave = 'On Leave',
    Inactive = 'Inactive',
    Probation = 'Probation',
}

export enum EmployeeType {
    FullTime = 'Full-Time',
    PartTime = 'Part-Time',
    Contract = 'Contract',
    PerDiem = 'Per Diem',
}

export enum ShiftType {
    Day = 'Day',
    Evening = 'Evening',
    Night = 'Night',
    Rotating = 'Rotating',
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export enum MaritalStatus {
    Single = 'Single',
    Married = 'Married',
    Divorced = 'Divorced',
    Widowed = 'Widowed',
}

export enum CertificationStatus {
    Active = 'Active',
    Expired = 'Expired',
    Pending = 'Pending',
}

export enum DocumentType {
    Resume = 'Resume',
    License = 'License',
    Certificate = 'Certificate',
    Background = 'Background',
    Contract = 'Contract',
    Other = 'Other',
}

// Interfaces
export interface Certification {
    name: string
    issueDate: string
    expiryDate: string
    status: CertificationStatus
    issuingAuthority?: string
}

export interface Document {
    id?: string
    name: string
    type: DocumentType
    uploadDate: string
    size: string
    url?: string
}

export interface EmergencyContact {
    name: string
    relation: string
    phone: string
    address: string
    email?: string
}

export interface BankInfo {
    bankName: string
    accountNumber: string
    routingNumber: string
    accountType?: 'Checking' | 'Savings'
}

export interface PerformanceReview {
    rating: number
    lastReviewDate: string
    nextReviewDate: string
    reviewedBy?: string
    notes?: string
}

export interface Attendance {
    totalLeaveDays: number
    usedLeaveDays: number
    sickDays: number
    absences?: number
    lateArrivals?: number
}

export interface Employee {
    id: number

    // Personal Information
    firstName: string
    lastName: string
    fullName: string
    email: string
    phone: string
    dateOfBirth: string
    gender: Gender
    maritalStatus: MaritalStatus
    avatar?: string

    // Address
    address: string
    city: string
    state: string
    zipCode: string
    country: string

    // Employment Information
    employeeId: string
    role: string
    department: string
    employeeType: EmployeeType
    shiftType: ShiftType
    hireDate: string
    terminationDate?: string
    salary: number
    status: EmployeeStatus
    supervisor?: string

    // Related Data
    certifications: Certification[]
    documents: Document[]
    emergencyContact: EmergencyContact
    bankInfo?: BankInfo
    performance: PerformanceReview
    attendance: Attendance
}

export interface EmployeeFormData extends Omit<Employee, 'id' | 'fullName'> {
    id?: number
}

export interface EmployeeListFilters {
    searchQuery: string
    role?: string | null
    department?: string | null
    status?: EmployeeStatus | null
    employeeType?: EmployeeType | null
    shiftType?: ShiftType | null
}

export interface EmployeeStats {
    total: number
    active: number
    fullTime: number
    avgRating: string
}
