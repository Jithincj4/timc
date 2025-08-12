import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SPECIALIZATION_DATA } from 'src/app/core/constants/master-data';
import { Specialization } from 'src/app/core/models/facilitator.model';

@Component({
  selector: 'app-facilitator-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './facilitator-list.component.html',
  styleUrls: ['./facilitator-list.component.css']
})
export class FacilitatorListComponent implements OnInit {

  facilitators: any[] = [];
  filteredFacilitators: any[] = [];
  pagedFacilitators: any[] = [];

  search: string = '';

  // Pagination
  page = 1;
  pageSize = 6;
  totalPages = 0;
  start = 0;
  end = 0;

  constructor(private facilitatorService: AdminService,private router:Router) {
    console.log('FacilitatorListComponent initialized');
    this.loadFacilitators();}

  ngOnInit(): void {
    
  }

  loadFacilitators(): void {
    this.facilitatorService.getFacilitators().subscribe({
      next: (res) => {
        this.facilitators = res || [];
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error loading facilitators', err);
      }
    });
  }

  applyFilter(): void {
    const term = this.search.trim().toLowerCase();
    if (term) {
      this.filteredFacilitators = this.facilitators.filter(f =>
        `${f.firstName || ''} ${f.lastName || ''}`.toLowerCase().includes(term) ||
        (f.email || '').toLowerCase().includes(term) ||
        (f.phone || '').toLowerCase().includes(term) ||
        (f.country || '').toLowerCase().includes(term)
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
    return ids
      .map(s => s.specializationName)
      .join(', ');
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
    // TODO: navigate to edit form
  }

  deleteFacilitator(id: string): void {
    if (confirm('Are you sure you want to delete this facilitator?')) {
      this.facilitatorService.deleteFacilitator(id).subscribe({
        next: () => {
          this.facilitators = this.facilitators.filter(f => f.id !== id);
          this.applyFilter();
        },
        error: (err) => {
          console.error('Error deleting facilitator', err);
        }
      });
    }
  }
  createFacilitator(): void {
    this.router.navigate(['/home/admin/facilitator-create']);
  }
}
