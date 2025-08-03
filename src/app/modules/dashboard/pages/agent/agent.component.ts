import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

interface Patient {
  id: string;
  name: string;
  email: string;
  mrd: string;
  service: string;
  status: 'Active' | 'Pending' | 'Completed';
  lastUpdated: string;
  avatar: string;
}

interface DashboardStats {
  totalPatients: number;
  activeLeads: number;
  upcomingAppointments: number;
  pendingQueries: number;
}

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
  imports: [NgFor, NgIf, AngularSvgIconModule],
})
export class AgentComponent implements OnInit {
  stats: DashboardStats = {
    totalPatients: 42,
    activeLeads: 18,
    upcomingAppointments: 7,
    pendingQueries: 5
  };

  recentPatients: Patient[] = [
    {
      id: '1',
      name: 'Ahmed Smith',
      email: 'ahmed.smith@example.com',
      mrd: 'MRD-78234',
      service: 'Cardiology Consultation',
      status: 'Active',
      lastUpdated: '2 hours ago',
      avatar: 'AS'
    },
    {
      id: '2',
      name: 'Maria Johnson',
      email: 'maria.j@example.com',
      mrd: 'MRD-89123',
      service: 'Orthopedic Surgery',
      status: 'Pending',
      lastUpdated: '1 day ago',
      avatar: 'MJ'
    },
    {
      id: '3',
      name: 'Robert Lee',
      email: 'robert.lee@example.com',
      mrd: 'MRD-67451',
      service: 'Dental Implant',
      status: 'Completed',
      lastUpdated: '3 days ago',
      avatar: 'RL'
    },
    {
      id: '4',
      name: 'Sarah Kim',
      email: 'sarah.kim@example.com',
      mrd: 'MRD-56234',
      service: 'Fertility Treatment',
      status: 'Active',
      lastUpdated: '5 days ago',
      avatar: 'SK'
    }
  ];

  activeTab: string = 'new-leads';

  constructor() {}

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs';
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  viewPatient(patient: Patient): void {
    console.log('View patient:', patient);
  }

  editPatient(patient: Patient): void {
    console.log('Edit patient:', patient);
  }

  deletePatient(patient: Patient): void {
    console.log('Delete patient:', patient);
  }

  addNewLead(): void {
    console.log('Add new lead');
  }
}