import { MenuItem } from '../models/menu.model';

export class Menu {
  public static adminPages: MenuItem[] = [
    {
      group: 'Admin',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/home/admin',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'User management',
          route: '/home/admin/users',
        }
        // Add more admin-specific routes here
      ],
    },
  ];
}
