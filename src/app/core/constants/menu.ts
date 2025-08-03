import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Home',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/home.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
      ],
    },
    {
      group: 'Medical',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/clipboard-document.svg',
          label: 'Medical History',
          route: '/profile/medical-history',
        },
        {
          icon: 'assets/icons/heroicons/outline/document-plus.svg',
          label: 'Documents',
          route: '/profile/documents',
        },
      ],
    },
    {
      group: 'Treatment',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/briefcase.svg',
          label: 'Current Case',
          route: '/profile/current-case',
        },
        {
          icon: 'assets/icons/heroicons/outline/calendar.svg',
          label: 'Appointments',
          route: '/profile/appointments',
        },
        {
          icon: 'assets/icons/heroicons/outline/building-library.svg',
          label: 'Hospital Booking',
          route: '/profile/hospital-booking',
        },
      ],
    },
    {
      group: 'Financial',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/currency-dollar.svg',
          label: 'Financial Info',
          route: '/profile/financial',
        },
      ],
    },
    {
      group: 'Consent & Security',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/document-text.svg',
          label: 'Consent Management',
          route: '/profile/consents',
        },
        {
          icon: 'assets/icons/heroicons/outline/shield-check.svg',
          label: 'Security',
          route: '/profile/security',
        },
      ],
    },
    {
      group: 'Travel',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/globe-alt.svg',
          label: 'Travel & Accommodation',
          route: '/profile/travel',
        },
      ],
    },
    {
      group: 'Communication',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/profile/notifications',
        },
        {
          icon: 'assets/icons/heroicons/outline/chat-bubble-left-ellipsis.svg',
          label: 'Messages',
          route: '/profile/messages',
        },
        {
          icon: 'assets/icons/heroicons/outline/question-mark-circle.svg',
          label: 'Support',
          route: '/profile/support',
        },
      ],
    },
  ];
}
