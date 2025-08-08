import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facilitator-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './facilitator-list.component.html'
})
export class FacilitatorListComponent implements OnInit {
  facilitators: any[] = [];
  loading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  constructor(
    private adminService: AdminService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadFacilitators();
  }
  get filteredFacilitators(): any[] {
    if (!this.searchTerm) return this.facilitators;
    const term = this.searchTerm.toLowerCase();
    return this.facilitators.filter(f =>
      (f.firstName + ' ' + f.lastName).toLowerCase().includes(term) ||
      f.email.toLowerCase().includes(term)
    );
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
  get totalPages(): number {
    return Math.ceil(this.filteredFacilitators.length / this.pageSize) || 1;
  }

  get pagedFacilitators(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredFacilitators.slice(start, start + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  getSpecializations(facilitator: any): string {
    if (!facilitator.specializations || facilitator.specializations.length === 0) {
      return '-';
    }
    return facilitator.specializations.map((s: { specializationName: any; }) => s.specializationName).join(', ');
  }


}
