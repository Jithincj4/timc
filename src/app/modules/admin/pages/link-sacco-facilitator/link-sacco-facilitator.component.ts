import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { c } from 'node_modules/@angular/material/dialog.d-hlN3f-Hk';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-link-sacco-facilitator',
  imports: [CommonModule,FormsModule],
  templateUrl: './link-sacco-facilitator.component.html'
})
export class LinkSaccoFacilitatorComponent implements OnInit {
  saccos: any[] = [];
  facilitators: any[] = [];
  selectedSaccoId = '';
  selectedFacilitatorId = '';
  loading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSaccos();
    this.loadFacilitators();
  }

  loadSaccos() {
    this.adminService.getSaccos().subscribe(data => this.saccos = data);
  }

  loadFacilitators() {
    this.adminService.getFacilitators().subscribe(data => this.facilitators = data);
  }

  linkSacco() {
    if (!this.selectedSaccoId || !this.selectedFacilitatorId) {
      alert('Please select both SACCO and Facilitator.');
      return;
    }

    this.loading = true;
    this.adminService.linkSaccoToFacilitator(this.selectedSaccoId, this.selectedFacilitatorId).subscribe({
      next: () => {
        this.loading = false;
        alert('SACCO linked to facilitator successfully!');
      },
      error: () => {
        this.loading = false;
        alert('Error linking SACCO.');
      }
    });
  }
}
