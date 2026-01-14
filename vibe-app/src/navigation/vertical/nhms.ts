export default [
  {
    title: 'NHMS',
    icon: { icon: 'tabler-hospital' },
    children: [
      {
        title: 'Dashboard',
        icon: { icon: 'tabler-dashboard' },
        to: 'nhms-dashboard',
      },
      {
        title: 'Resident Management',
        icon: { icon: 'tabler-users' },
        children: [
          { title: 'List', to: 'nhms-resident-management-list' },
          { title: 'Details', to: { name: 'nhms-resident-management-details-id', params: { id: '1' } } },
        ],
      },
      {
        title: 'Care & Nursing',
        icon: { icon: 'tabler-heartbeat' },
        to: 'nhms-care-nursing',
      },
      {
        title: 'Medical & Health Records',
        icon: { icon: 'tabler-file-medical' },
        to: 'nhms-medical-health-records',
      },
      {
        title: 'Staff & Shift Management',
        icon: { icon: 'tabler-calendar-time' },
        to: 'nhms-staff-shift-management',
      },
      {
        title: 'Rooms & Facilities',
        icon: { icon: 'tabler-building' },
        to: 'nhms-rooms-facilities',
      },
      {
        title: 'Services & Care Packages',
        icon: { icon: 'tabler-package' },
        to: 'nhms-services-care-packages',
      },
      {
        title: 'Contracts & Finance',
        icon: { icon: 'tabler-file-invoice' },
        to: 'nhms-contracts-finance',
      },
      {
        title: 'Family Portal',
        icon: { icon: 'tabler-home-heart' },
        to: 'nhms-family-portal',
      },
      {
        title: 'Reports & Analytics',
        icon: { icon: 'tabler-chart-bar' },
        to: 'nhms-reports-analytics',
      },
      {
        title: 'System Settings',
        icon: { icon: 'tabler-settings' },
        to: 'nhms-system-settings',
      },
    ],
  },
]
