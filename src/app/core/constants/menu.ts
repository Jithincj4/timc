import { MenuItem } from '../models/menu.model';

export class Menu {
  public static adminPages: MenuItem[] = [
    {
      group: 'Admin',
      separator: true,
      items: [
        {
          icon: 'fas fa-tachometer-alt',
          label: 'Admin Dashboard',
          route: '/home/admin',
        },
      ],
    },
    {
      group: 'Administration',
      separator: true,
      items: [
        {
          icon: 'fas fa-user-tie',
          label: 'SACCO & Agent Management',
          route: '/home/admin/sacco-list',
        },
        {
          icon: 'fas fa-user-friends',
          label: 'Facilitator Management',
          route: '/home/admin/facilitator-list',
        },
        {
          icon: 'fas fa-cogs',
          label: 'Service Management',
          route: '/home/admin/service-management',
        },
        { 
          icon: 'fas fa-link',
          label: 'Link SACCO to Facilitator',
          route: '/home/admin/link-sacco-facilitator',
        },
        {
          icon: 'fas fa-comments',
          label: 'Messages',
          route: '/home/admin/chat',
        },
      ],
    },
  ];
}
