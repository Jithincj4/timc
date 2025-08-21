import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  facilitatorsCount: number;
  patientsCount: number;
  status: 'Active' | 'Inactive';
}

interface Facilitator {
  id: string;
  name: string;
  email: string;
  phone: string;
  agents: string[];
  patientsCount: number;
  status: 'Active' | 'Inactive';
}

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  agent: string;
  facilitator: string;
  registrationDate: string;
  status: 'Active' | 'Inactive';
}

@Component({
  imports: [CommonModule],
  selector: 'app-admin-dashboard',
  templateUrl: './agent-dashboard.component.html'
})
export class AgentDashboardComponent {
  agents: Agent[] = [
    { id: 'AG001', name: 'John Smith', email: 'john@example.com', phone: '123-456-7890', facilitatorsCount: 5, patientsCount: 42, status: 'Active' },
    { id: 'AG002', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '234-567-8901', facilitatorsCount: 3, patientsCount: 28, status: 'Active' },
    { id: 'AG003', name: 'Michael Brown', email: 'michael@example.com', phone: '345-678-9012', facilitatorsCount: 7, patientsCount: 65, status: 'Inactive' },
    { id: 'AG004', name: 'Emily Davis', email: 'emily@example.com', phone: '456-789-0123', facilitatorsCount: 4, patientsCount: 37, status: 'Active' },
    { id: 'AG005', name: 'David Wilson', email: 'david@example.com', phone: '567-890-1234', facilitatorsCount: 2, patientsCount: 19, status: 'Active' },
    { id: 'AG006', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '678-901-2345', facilitatorsCount: 6, patientsCount: 51, status: 'Active' }
  ];

  facilitators: Facilitator[] = [
    { id: 'FC001', name: 'Robert Taylor', email: 'robert@example.com', phone: '678-901-2345', agents: ['John Smith', 'Sarah Johnson'], patientsCount: 32, status: 'Active' },
    { id: 'FC002', name: 'Jennifer Martinez', email: 'jennifer@example.com', phone: '789-012-3456', agents: ['Michael Brown', 'Emily Davis'], patientsCount: 45, status: 'Active' },
    { id: 'FC003', name: 'William Anderson', email: 'william@example.com', phone: '890-123-4567', agents: ['David Wilson'], patientsCount: 18, status: 'Inactive' },
    { id: 'FC004', name: 'Lisa Thomas', email: 'lisa@example.com', phone: '901-234-5678', agents: ['John Smith', 'Michael Brown'], patientsCount: 53, status: 'Active' },
    { id: 'FC005', name: 'James Jackson', email: 'james@example.com', phone: '012-345-6789', agents: ['Sarah Johnson', 'Emily Davis', 'David Wilson'], patientsCount: 61, status: 'Active' }
  ];

  patients: Patient[] = [
    { id: 'PT001', name: 'Mary White', email: 'mary@example.com', phone: '111-222-3333', agent: 'John Smith', facilitator: 'Robert Taylor', registrationDate: '2023-01-15', status: 'Active' },
    { id: 'PT002', name: 'Patricia Harris', email: 'patricia@example.com', phone: '222-333-4444', agent: 'Sarah Johnson', facilitator: 'Jennifer Martinez', registrationDate: '2023-02-20', status: 'Active' },
    { id: 'PT003', name: 'Richard Clark', email: 'richard@example.com', phone: '333-444-5555', agent: 'Michael Brown', facilitator: 'William Anderson', registrationDate: '2023-03-10', status: 'Inactive' },
    { id: 'PT004', name: 'Linda Lewis', email: 'linda@example.com', phone: '444-555-6666', agent: 'Emily Davis', facilitator: 'Lisa Thomas', registrationDate: '2023-04-05', status: 'Active' },
    { id: 'PT005', name: 'Joseph Robinson', email: 'joseph@example.com', phone: '555-666-7777', agent: 'David Wilson', facilitator: 'James Jackson', registrationDate: '2023-05-12', status: 'Active' }
  ];

  activeView: 'grid' | 'table' = 'grid';

  get totalAgents() { return this.agents.length; }
  get totalFacilitators() { return this.facilitators.length; }
  get totalPatients() { return this.patients.length; }
}
