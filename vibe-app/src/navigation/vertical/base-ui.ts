export default [
  {
    title: 'Base UI',
    icon: { icon: 'tabler-box-multiple' },
    children: [
      // Dashboards
      {
        title: 'Dashboards',
        icon: { icon: 'tabler-dashboard' },
        children: [
        //   { title: 'Analytics', to: 'base-ui-dashboards-analytics' },
        //   { title: 'CRM', to: 'base-ui-dashboards-crm' },
        //   { title: 'eCommerce', to: 'base-ui-dashboards-ecommerce' },
        ],
      },

      // Apps
      {
        title: 'Apps',
        icon: { icon: 'tabler-layout-grid-add' },
        children: [
          {
            title: 'Email',
            to: 'base-ui-apps-email',
          },
          {
            title: 'Chat',
            to: 'base-ui-apps-chat',
          },
          {
            title: 'Calendar',
            to: 'base-ui-apps-calendar',
          },
          {
            title: 'Kanban',
            to: 'base-ui-apps-kanban',
          },
          {
            title: 'eCommerce',
            children: [
              { title: 'Manage Review', to: 'base-ui-apps-ecommerce-manage-review' },
              { title: 'Referrals', to: 'base-ui-apps-ecommerce-referrals' },
              { title: 'Settings', to: 'base-ui-apps-ecommerce-settings' },
              { title: 'Product Category', to: 'base-ui-apps-ecommerce-product-category-list' },
            ],
          },
          {
            title: 'Academy',
            children: [
              { title: 'Dashboard', to: 'base-ui-apps-academy-dashboard' },
              { title: 'My Course', to: 'base-ui-apps-academy-my-course' },
              { title: 'Course Details', to: 'base-ui-apps-academy-course-details' },
            ],
          },
          {
            title: 'Logistics',
            children: [
              { title: 'Dashboard', to: 'base-ui-apps-logistics-dashboard' },
              { title: 'Fleet', to: 'base-ui-apps-logistics-fleet' },
            ],
          },
          {
            title: 'Invoice',
            children: [
              { title: 'List', to: 'base-ui-apps-invoice-list' },
              { title: 'Preview', to: { name: 'base-ui-apps-invoice-preview-id', params: { id: '5036' } } },
              { title: 'Edit', to: { name: 'base-ui-apps-invoice-edit-id', params: { id: '5036' } } },
              { title: 'Add', to: 'base-ui-apps-invoice-add' },
            ],
          },
          {
            title: 'User',
            children: [
              { title: 'List', to: 'base-ui-apps-user-list' },
              { title: 'View', to: { name: 'base-ui-apps-user-view-id', params: { id: 21 } } },
            ],
          },
          {
            title: 'Roles',
            to: 'base-ui-apps-roles',
          },
          {
            title: 'Permissions',
            to: 'base-ui-apps-permissions',
          },
        ],
      },

      // UI Elements
      {
        title: 'UI Elements',
        icon: { icon: 'tabler-layout' },
        children: [
          { title: 'Typography', to: 'base-ui-pages-typography' },
          { title: 'Icons', to: 'base-ui-pages-icons' },
          {
            title: 'Cards',
            children: [
              { title: 'Basic', to: 'base-ui-pages-cards-card-basic' },
              { title: 'Advance', to: 'base-ui-pages-cards-card-advance' },
              { title: 'Statistics', to: 'base-ui-pages-cards-card-statistics' },
              { title: 'Widgets', to: 'base-ui-pages-cards-card-widgets' },
              { title: 'Actions', to: 'base-ui-pages-cards-card-actions' },
            ],
          },
          {
            title: 'Components',
            children: [
              { title: 'Alert', to: 'base-ui-components-alert' },
              { title: 'Avatar', to: 'base-ui-components-avatar' },
              { title: 'Badge', to: 'base-ui-components-badge' },
              { title: 'Button', to: 'base-ui-components-button' },
              { title: 'Chip', to: 'base-ui-components-chip' },
              { title: 'Dialog', to: 'base-ui-components-dialog' },
              { title: 'Expansion Panel', to: 'base-ui-components-expansion-panel' },
              { title: 'List', to: 'base-ui-components-list' },
              { title: 'Menu', to: 'base-ui-components-menu' },
              { title: 'Pagination', to: 'base-ui-components-pagination' },
              { title: 'Progress Circular', to: 'base-ui-components-progress-circular' },
              { title: 'Progress Linear', to: 'base-ui-components-progress-linear' },
              { title: 'Snackbar', to: 'base-ui-components-snackbar' },
              { title: 'Tabs', to: 'base-ui-components-tabs' },
              { title: 'Timeline', to: 'base-ui-components-timeline' },
              { title: 'Tooltip', to: 'base-ui-components-tooltip' },
            ],
          },
          {
            title: 'Extensions',
            children: [
              { title: 'Tour', to: 'base-ui-extensions-tour' },
              { title: 'Swiper', to: 'base-ui-extensions-swiper' },
            ],
          },
        ],
      },

      // Forms
      {
        title: 'Forms',
        icon: { icon: 'tabler-forms' },
        children: [
          { title: 'Autocomplete', to: 'base-ui-forms-autocomplete' },
          { title: 'Checkbox', to: 'base-ui-forms-checkbox' },
          { title: 'Combobox', to: 'base-ui-forms-combobox' },
          { title: 'Custom Input', to: 'base-ui-forms-custom-input' },
          { title: 'Date Time Picker', to: 'base-ui-forms-date-time-picker' },
          { title: 'Editors', to: 'base-ui-forms-editors' },
          { title: 'File Input', to: 'base-ui-forms-file-input' },
          { title: 'Form Layouts', to: 'base-ui-forms-form-layouts' },
          { title: 'Form Validation', to: 'base-ui-forms-form-validation' },
          { title: 'Form Wizard Icons', to: 'base-ui-forms-form-wizard-icons' },
          { title: 'Form Wizard Numbered', to: 'base-ui-forms-form-wizard-numbered' },
          { title: 'Radio', to: 'base-ui-forms-radio' },
          { title: 'Range Slider', to: 'base-ui-forms-range-slider' },
          { title: 'Rating', to: 'base-ui-forms-rating' },
          { title: 'Select', to: 'base-ui-forms-select' },
          { title: 'Slider', to: 'base-ui-forms-slider' },
          { title: 'Switch', to: 'base-ui-forms-switch' },
          { title: 'Textarea', to: 'base-ui-forms-textarea' },
          { title: 'Textfield', to: 'base-ui-forms-textfield' },
        ],
      },

      // Tables
      {
        title: 'Tables',
        icon: { icon: 'tabler-table' },
        children: [
          { title: 'Simple Table', to: 'base-ui-tables-simple-table' },
          { title: 'Data Table', to: 'base-ui-tables-data-table' },
        ],
      },

      // Charts
      {
        title: 'Charts',
        icon: { icon: 'tabler-chart-donut' },
        children: [
          { title: 'Apex Chart', to: 'base-ui-charts-apex-chart' },
          { title: 'ChartJS', to: 'base-ui-charts-chartjs' },
        ],
      },

      // Pages
      {
        title: 'Pages',
        icon: { icon: 'tabler-file' },
        children: [
          {
            title: 'User Profile',
            to: { name: 'base-ui-pages-user-profile-tab', params: { tab: 'profile' } },
          },
          {
            title: 'Account Settings',
            to: { name: 'base-ui-pages-account-settings-tab', params: { tab: 'account' } },
          },
          { title: 'FAQ', to: 'base-ui-pages-faq' },
          { title: 'Pricing', to: 'base-ui-pages-pricing' },
          { title: 'Dialog Examples', to: 'base-ui-pages-dialog-examples' },
          {
            title: 'Misc',
            children: [
              { title: 'Coming Soon', to: 'base-ui-pages-misc-coming-soon' },
              { title: 'Under Maintenance', to: 'base-ui-pages-misc-under-maintenance' },
            ],
          },
          {
            title: 'Authentication',
            children: [
              {
                title: 'Login',
                children: [
                  { title: 'Login v1', to: 'base-ui-pages-authentication-login-v1', target: '_blank' },
                  { title: 'Login v2', to: 'base-ui-pages-authentication-login-v2', target: '_blank' },
                ],
              },
              {
                title: 'Register',
                children: [
                  { title: 'Register v1', to: 'base-ui-pages-authentication-register-v1', target: '_blank' },
                  { title: 'Register v2', to: 'base-ui-pages-authentication-register-v2', target: '_blank' },
                  { title: 'Register Multi-Steps', to: 'base-ui-pages-authentication-register-multi-steps', target: '_blank' },
                ],
              },
              {
                title: 'Verify Email',
                children: [
                  { title: 'Verify Email v1', to: 'base-ui-pages-authentication-verify-email-v1', target: '_blank' },
                  { title: 'Verify Email v2', to: 'base-ui-pages-authentication-verify-email-v2', target: '_blank' },
                ],
              },
              {
                title: 'Forgot Password',
                children: [
                  { title: 'Forgot Password v1', to: 'base-ui-pages-authentication-forgot-password-v1', target: '_blank' },
                  { title: 'Forgot Password v2', to: 'base-ui-pages-authentication-forgot-password-v2', target: '_blank' },
                ],
              },
              {
                title: 'Reset Password',
                children: [
                  { title: 'Reset Password v1', to: 'base-ui-pages-authentication-reset-password-v1', target: '_blank' },
                  { title: 'Reset Password v2', to: 'base-ui-pages-authentication-reset-password-v2', target: '_blank' },
                ],
              },
              {
                title: 'Two Steps',
                children: [
                  { title: 'Two Steps v1', to: 'base-ui-pages-authentication-two-steps-v1', target: '_blank' },
                  { title: 'Two Steps v2', to: 'base-ui-pages-authentication-two-steps-v2', target: '_blank' },
                ],
              },
            ],
          },
        ],
      },

      // Wizard Examples
      {
        title: 'Wizard Examples',
        icon: { icon: 'tabler-wand' },
        children: [
          { title: 'Checkout', to: 'base-ui-wizard-examples-checkout' },
          { title: 'Property Listing', to: 'base-ui-wizard-examples-property-listing' },
          { title: 'Create Deal', to: 'base-ui-wizard-examples-create-deal' },
        ],
      },

      // Front Pages
      {
        title: 'Front Pages',
        icon: { icon: 'tabler-files' },
        children: [
          { title: 'Landing', to: 'base-ui-front-pages-landing-page', target: '_blank' },
          { title: 'Pricing', to: 'base-ui-front-pages-pricing' },
          { title: 'Payment', to: 'base-ui-front-pages-payment' },
          { title: 'Checkout', to: 'base-ui-front-pages-checkout' },
          { title: 'Help Center', to: 'base-ui-front-pages-help-center' },
        ],
      },

      // Access Control
      {
        title: 'Access Control',
        icon: { icon: 'tabler-shield' },
        to: 'base-ui-access-control',
      },
    ],
  },
]
