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
          label: 'Agents',
          route: '/home/admin/sacco-list',
        },
        {
          icon: 'fas fa-user-friends',
          label: 'Facilitators',
          route: '/home/admin/facilitator-list',
        },
        {
          icon: 'fas fa-cogs',
          label: 'Services',
          route: '/home/admin/service-management',
        },
        {
          icon: 'fas fa-comments',
          label: 'Messages',
          route: '/home/admin/chat',
        },
      ],
    },
  ];
  public static agentMenus: MenuItem[] = [
    {
      group: 'Agent',
      separator: true,
      items: [
        {
          icon: 'fas fa-tachometer-alt',
          label: 'Dashboard',
          route: '/home',
        },
      ]
    }
  ];
}
