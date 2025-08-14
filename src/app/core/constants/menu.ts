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
        },
      ],
    },
    {
      group: 'Create / Manage',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'SACCO/Agent Management',
          route: '/home/admin/sacco-list',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Facilitators Management',
          route: '/home/admin/facilitator-list',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Services',
          route: '/home/admin/service-management',
        },
        { 
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Link SACCO to Facilitator', route: '/home/admin/link-sacco-facilitator' },
          {icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Messages', route: '/home/admin/chat' },
      ],
    },
  ];
}
