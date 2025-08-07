import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements AfterViewInit {
  stats = {
    totalUsers: 128,
    totalPatients: 72,
    totalSaccos: 6,
    totalFacilitators: 15
  };

  recentActivity = [
    'New patient John Doe registered',
    'Milestone completed for Jane Smith',
    'New SACCO added: HealthCare Kenya',
    'Facilitator approved: Asha Ali'
  ];

  ngAfterViewInit() {
    new Chart('patientsChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Patients',
          data: [5, 12, 8, 10, 15],
          backgroundColor: 'rgba(0, 212, 255, 0.5)',
          borderColor: '#00d4ff',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
