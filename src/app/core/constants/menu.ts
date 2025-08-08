import { MenuItem } from '../models/menu.model';

export class Menu {
  public static adminPages: MenuItem[] = [
    {
      group: 'Admin',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Admin Dashboard',
          route: '/home/admin/dashboard', // Updated to point to Admin Console
        }
      ],
    },
    {
      group: 'Create / Manage',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'SACCO Management',
          children: [
            { label: 'View SACCOs', route: '/home/admin/sacco-list' },
            { label: 'Create SACCO', route: '/home/admin/sacco-create' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-group.svg',
          label: 'Facilitator Management',
          children: [
            { label: 'View Facilitators', route: '/home/admin/facilitator-list' },
            { label: 'Create Facilitator', route: '/home/admin/facilitator-create' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Patient Assignments',
          route: '/admin/patient-assignment',
          children: [
            { label: 'View Patients by Facilitator', route: '/home/admin/patient-by-facilitator' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/clipboard-document-list.svg',
          label: 'Case Pipeline & Metrics',
          route: '/admin/case-pipeline',
        },
        {
          icon: 'assets/icons/heroicons/outline/cog-6-tooth.svg',
          label: 'System Configurations',
          route: '/admin/system-config',
          children: [
            { label: 'Link SACCO to Facilitator', route: '/home/admin/link-sacco-facilitator' },
          ],
        }
      ],
    },
  ];
}
