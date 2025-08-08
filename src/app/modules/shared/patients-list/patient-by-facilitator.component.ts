import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-by-facilitator',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './patient-by-facilitator.component.html'
})
export class PatientByFacilitatorComponent implements OnInit {
  facilitators: any[] = [];
  patients: any[] = [];
  selectedFacilitatorId = '';
  loadingFacilitators = false;
  loadingPatients = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadFacilitators();
  }

  loadFacilitators() {
    this.loadingFacilitators = true;
    this.adminService.getFacilitators().subscribe({
      next: (data) => {
        this.facilitators = data;
        this.loadingFacilitators = false;
      },
      error: () => {
        this.loadingFacilitators = false;
        alert('Error loading facilitators.');
      }
    });
  }

  loadPatients() {
    if (!this.selectedFacilitatorId) return;
    this.loadingPatients = true;
    this.adminService.getPatientsByFacilitator(this.selectedFacilitatorId).subscribe({
      next: (data) => {
        this.patients = data;
        this.loadingPatients = false;
      },
      error: () => {
        this.loadingPatients = false;
        alert('Error loading patients.');
      }
    });
  }
}
