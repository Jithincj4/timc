import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilitator-list',
  imports: [CommonModule],
  templateUrl: './facilitator-list.component.html'
})
export class FacilitatorListComponent implements OnInit {
  facilitators: any[] = [];
  loading = false;

  constructor(
    private adminService: AdminService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadFacilitators();
  }

  loadFacilitators() {
    this.loading = true;
    this.adminService.getFacilitators().subscribe({
      next: (data) => {
        this.facilitators = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error loading facilitators.');
      }
    });
  }

  editFacilitator(id: string) {
    this.router.navigate(['/admin/facilitator-edit', id]);
  }

  deleteFacilitator(id: string) {
    if (!confirm('Are you sure you want to delete this facilitator?')) return;
    this.adminService.deleteFacilitator(id).subscribe({
      next: () => {
        this.facilitators = this.facilitators.filter(f => f.id !== id);
      },
      error: () => alert('Error deleting facilitator.')
    });
  }
}
