export default [
  {
    title: 'NHMS',
    icon: { icon: 'tabler-hospital' },
    children: [
      {
        title: 'Dashboard',
        icon: { icon: 'tabler-dashboard' },
        to: { name: 'nhms-dashboard' },
      },
      {
        title: 'Human Resource',
        icon: { icon: 'tabler-users-group' },
        children: [
          { title: 'Employee List', to: { name: 'nhms-human-resource-list' } },
          { title: 'Employee Details', to: { name: 'nhms-human-resource-details-id', params: { id: '1' } } },
        ],
      },
    ],
  },
]
