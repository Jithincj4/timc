// src/app/components/facilitator-list/facilitator-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Specialization } from 'src/app/core/models/facilitator.model';

@Component({
  selector: 'app-facilitator-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './facilitator-list.component.html',
  styleUrls: ['./facilitator-list.component.css']
})
export class FacilitatorListComponent implements OnInit {
  facilitators: any[] = [];
  loading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 5;

  specializations: Specialization[] = [
    { specializationId: 1, specializationName: 'Medical Agent', categoryId: 4, categoryName: 'Medical Agent' },
    { specializationId: 2, specializationName: 'Travel Agent', categoryId: 2, categoryName: 'Travel Agent' },
    { specializationId: 3, specializationName: 'Booking Agent', categoryId: 1, categoryName: 'Booking Agent' },
    { specializationId: 4, specializationName: 'Insurance Agent', categoryId: 3, categoryName: 'Insurance Agent' },
    { specializationId: 5, specializationName: 'Medical Tourism', categoryId: 5, categoryName: 'Medical Tourism' },
    { specializationId: 6, specializationName: 'Healthcare Consultant', categoryId: 4, categoryName: 'Medical Agent' },
  ];

  // badge gradients (used in template)
  badgeColors = [
    'linear-gradient(90deg,#06b6d4,#7c3aed)', // cyan→indigo
    'linear-gradient(90deg,#f97316,#ef476f)', // orange→magenta
    'linear-gradient(90deg,#10b981,#06b6d4)', // green→cyan
    'linear-gradient(90deg,#f43f5e,#fb7185)'  // red→pink
  ];

  constructor(
    private adminService: AdminService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadFacilitators();
  }

  // filtered list based on searchTerm
  get filteredFacilitators(): any[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') return this.facilitators;
    const term = this.searchTerm.toLowerCase();
    return this.facilitators.filter(f =>
      ((f.firstName || '') + ' ' + (f.lastName || '')).toLowerCase().includes(term) ||
      ((f.email || '')).toLowerCase().includes(term) ||
      (this.getSpecializationArray(f).join(' ').toLowerCase().includes(term))
    );
  }

  // pagedFacilitators is a getter that slices filteredFacilitators
  get pagedFacilitators(): any[] {
    this.clampCurrentPage(); // ensure currentPage is valid before slicing
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredFacilitators.slice(start, start + this.pageSize);
  }

  loadFacilitators() {
    this.loading = true;
    this.adminService.getFacilitators().subscribe({
      next: (data) => {
        this.facilitators = Array.isArray(data) ? data : (data || []);
        this.loading = false;
        this.currentPage = 1; // reset to first page after load
      },
      error: () => {
        this.loading = false;
        alert('Error loading facilitators.');
      }
    });
  }

  editFacilitator(id: string) {
    // match route used in template (you used /home/admin/facilitator-create earlier)
    this.router.navigate(['/admin/facilitator-edit', id]);
  }

  deleteFacilitator(id: string) {
    if (!confirm('Are you sure you want to delete this facilitator?')) return;
    this.adminService.deleteFacilitator(id).subscribe({
      next: () => {
        // remove from local array using facilitatorId (matches your template)
        this.facilitators = this.facilitators.filter(f => f.facilitatorId !== id && f.id !== id);
        // ensure current page is still valid
        this.clampCurrentPage();
      },
      error: () => alert('Error deleting facilitator.')
    });
  }

  // convert comma/string specializations to array
  getSpecializationArray(fac: any): string[] {
    if (!fac) return [];
    // if the model already provides names:
    if (Array.isArray(fac.specializationNames) && fac.specializationNames.length) {
      return fac.specializationNames;
    }

    // if specializationIds is an array of ids, map to names using local list
    if (Array.isArray(fac.specializationIds) && fac.specializationIds.length) {
      return fac.specializationIds.map((id: any) => this.lookupSpecializationName(+id));
    }

    // if the model has a comma-separated string
    if (typeof fac.specializations === 'string' && fac.specializations.trim()) {
      return fac.specializations.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    return [];
  }

  // lookup by id in the local specializations array
  lookupSpecializationName(id: number) {
    const found = this.specializations.find(s => s.specializationId === +id);
    return found ? found.specializationName : `#${id}`;
  }

  /* pagination helpers */
  get startIndex() { return (this.currentPage - 1) * this.pageSize; }
  get endIndex() { return Math.min(this.currentPage * this.pageSize, this.filteredFacilitators.length); }
  get totalPages() { return Math.max(1, Math.ceil(this.filteredFacilitators.length / this.pageSize)); }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.clampCurrentPage();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.clampCurrentPage();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.clampCurrentPage();
  }

  // called from template when pageSize select changes: reset to page 1
  onPageSizeChange() {
    this.currentPage = 1;
    this.clampCurrentPage();
  }

  // ensure currentPage is within valid bounds
  clampCurrentPage() {
    const total = this.totalPages;
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > total) this.currentPage = total;
  }

  // If you want to reset to page 1 whenever the searchTerm changes,
  // either call this method from the template (ngModelChange) or
  // implement a setter for searchTerm. Example method:
  onSearchChange() {
    this.currentPage = 1;
  }
}
