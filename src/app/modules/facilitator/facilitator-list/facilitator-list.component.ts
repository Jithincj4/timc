import { Component, effect, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SPECIALIZATION_DATA } from 'src/app/core/constants/master-data';
import { Specialization } from 'src/app/core/models/facilitator.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { FacilitatorService } from 'src/app/core/services/facilitator.service';

@Component({
  selector: 'app-facilitator-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './facilitator-list.component.html',
  styleUrls: ['./facilitator-list.component.css'],
})
export class FacilitatorListComponent implements OnInit {
 facilitators: any[] = [];
  filteredFacilitators: any[] = [];
  pagedFacilitators: any[] = [];

  facilitatorSignals  = this.facilitatorService.getAll();

  search: string = '';
  // Pagination
  page = 1;
  pageSize = 6;
  totalPages = 0;
  start = 0;
  end = 0;

  constructor(private alertService: AlertService, private facilitatorService: FacilitatorService, private router: Router) {
    effect(() => {
      if (this.facilitatorSignals.loading()) {
        console.log('Loading facilitators...');
      }
  
      if (this.facilitatorSignals.data()) {
        this.facilitators = this.facilitatorSignals.data()!;
        this.applyFilter();
      }
  
      if (this.facilitatorSignals.success()) {
        console.log('Load succeeded');
      }
  })
}

  ngOnInit(): void {}

 
  applyFilter(): void {
    const term = this.search.trim().toLowerCase();
    if (term) {
      this.filteredFacilitators = this.facilitators.filter(
        (f) =>
          `${f.firstName || ''} ${f.lastName || ''}`.toLowerCase().includes(term) ||
          (f.email || '').toLowerCase().includes(term) ||
          (f.phone || '').toLowerCase().includes(term) ||
          (f.country || '').toLowerCase().includes(term),
      );
    } else {
      this.filteredFacilitators = [...this.facilitators];
    }

    this.totalPages = Math.ceil(this.filteredFacilitators.length / this.pageSize);
    this.page = 1; // reset page
    this.updatePagedData();
  }

  updatePagedData(): void {
    this.start = (this.page - 1) * this.pageSize;
    this.end = Math.min(this.start + this.pageSize, this.filteredFacilitators.length);
    this.pagedFacilitators = this.filteredFacilitators.slice(this.start, this.end);
  }

  clearSearch(): void {
    this.search = '';
    this.applyFilter();
  }
  getSpecializationNames(ids: Specialization[]): string {
    return ids.map((s) => s.specializationName).join(', ');
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePagedData();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagedData();
    }
  }

  editFacilitator(facilitator: any): void {
    console.log('Edit facilitator', facilitator);
    this.router.navigate(['/home/admin/facilitator-edit', facilitator.facilitatorId]);
    // TODO: navigate to edit form
  }

  deleteFacilitator(id: string): void {
    if (this.alertService.showConfirm('Are you sure you want to delete this facilitator?')) {
      this.facilitatorService.delete(id);
      this.facilitators = this.facilitators.filter((f) => f.id !== id);
      this.applyFilter();
    }
  }
  createFacilitator(): void {
    this.router.navigate(['/home/admin/facilitator-create']);
  }
}
