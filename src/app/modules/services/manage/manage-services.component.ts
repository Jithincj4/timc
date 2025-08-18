import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ServiceDto } from 'src/app/core/models/service.model';
import { AppService } from 'src/app/core/services/app-service.service';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-services.component.html',
})
export class ManageServicesComponent implements OnInit {
  services: ServiceDto[] = [];
  filteredServices: ServiceDto[] = [];
  pagedServices: ServiceDto[] = [];

  
  categories = [
    { value: 'medical-procedure', label: 'Medical Procedure', icon: 'fas fa-procedures', description: 'Surgical and non-surgical treatments' },
    { value: 'wellness', label: 'Wellness Package', icon: 'fas fa-spa', description: 'Health and wellness programs' },
    { value: 'diagnostic', label: 'Diagnostic', icon: 'fas fa-x-ray', description: 'Medical tests and imaging' },
    { value: 'accommodation', label: 'Accommodation', icon: 'fas fa-bed', description: 'Stay options during treatment' },
    { value: 'transport', label: 'Transport', icon: 'fas fa-plane', description: 'Travel and local transportation' },
    { value: 'translation', label: 'Translation', icon: 'fas fa-language', description: 'Language assistance services' },
    { value: 'insurance', label: 'Insurance', icon: 'fas fa-shield-alt', description: 'Medical insurance services' },
    { value: 'visa', label: 'Visa Assistance', icon: 'fas fa-passport', description: 'Visa processing services' }
  ];
  
  filterCategory: string | '' = '';

  serviceSignals = this.serviceService.getAll();

  search: string = '';
  filterStatus: string = '';

  // Pagination
  page = 1;
  pageSize = 6;
  totalPages = 0;
  start = 0;
  end = 0;

  constructor(
    private serviceService: AppService,
    private alertService: AlertService,
    private router: Router
  ) {
    effect(() => {
      if (this.serviceSignals.loading()) {
        console.log('Loading services...');
      }

      if (this.serviceSignals.data()) {
        this.services = this.serviceSignals.data()!;
        this.applyFilter();
      }

      if (this.serviceSignals.success()) {
        console.log('Services loaded successfully');
      }
    });
  }

  ngOnInit(): void {}

  applyFilter(): void {
    const term = this.search.trim().toLowerCase();
    this.filteredServices = this.services.filter((s) => {
      const matchesSearch = term
        ? (s.name || '').toLowerCase().includes(term) ||
          (s.provider || '').toLowerCase().includes(term)
        : true;

      const matchesCategory = this.filterCategory
        ? (s.categoryName || '').toLowerCase() === this.filterCategory.toLowerCase()
        : true;

      const matchesStatus = this.filterStatus
        ? s.status === this.filterStatus
        : true;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    this.totalPages = Math.ceil(this.filteredServices.length / this.pageSize);
    this.page = 1;
    this.updatePagedData();
  }

  updatePagedData(): void {
    this.start = (this.page - 1) * this.pageSize;
    this.end = Math.min(this.start + this.pageSize, this.filteredServices.length);
    this.pagedServices = this.filteredServices.slice(this.start, this.end);
  }

  clearSearch(): void {
    this.search = '';
    this.applyFilter();
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

  editService(service: ServiceDto): void {
    console.log('Editing service:', service);
    this.router.navigate(['/home/admin/services', service.id, 'edit']);
  }

  viewService(service: ServiceDto): void {
    this.router.navigate(['/home/admin/services', service.id, 'view']);
  }

  deleteService(id: number): void {
    if (this.alertService.showConfirm('Are you sure you want to delete this service?')) {
      this.serviceService.delete(id);
      this.services = this.services.filter((s) => s.id !== id);
      this.applyFilter();
    }
  }

  createService(): void {
    this.router.navigate(['/home/admin/service-create']);
  }
}
