import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 128,
    totalPatients: 56,
    totalFacilitators: 12,
    totalSaccos: 8
  };

  recentMessages = [
    { sender: 'Dr. Adams', content: 'New referral added.' },
    { sender: 'Coordinator', content: 'Please check patient ID 453.' },
    { sender: 'Admin', content: 'Weekly report submitted.' }
  ];

  milestones = [
    { patientName: 'John Doe', stage: 'Visa Approval', date: new Date('2025-08-12') },
    { patientName: 'Jane Smith', stage: 'Travel Scheduled', date: new Date('2025-08-15') }
  ];

  ngOnInit(): void {}
}