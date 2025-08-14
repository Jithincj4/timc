import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { c } from 'node_modules/@angular/material/dialog.d-hlN3f-Hk';

interface ServiceItem {
  id: number;
  name: string;
  category: string;
  provider: string;
  price: string;
  status: 'active' | 'inactive' | 'draft';
  icon: string;
}

@Component({
  selector: 'app-manage-services',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-services.component.html'
})
export class ManageServicesComponent {
  router=inject(Router);
  searchTerm = '';
  filterCategory = '';
  filterStatus = '';

  services: ServiceItem[] = [
    { id: 1, name: 'Cardiac Surgery Package', category: 'Medical Procedure', provider: 'Nairobi Hospital', price: '$15,000', status: 'active', icon: 'fa-procedures' },
    { id: 2, name: 'Wellness Retreat Package', category: 'Wellness Package', provider: 'Serenity Wellness Center', price: '$2,500', status: 'active', icon: 'fa-spa' },
    { id: 3, name: 'Full Body Checkup', category: 'Diagnostic', provider: 'MedLab Diagnostics', price: '$800', status: 'inactive', icon: 'fa-x-ray' },
    { id: 4, name: 'Airport Transfer Service', category: 'Transport', provider: 'Safe Travels Transport', price: '$50', status: 'active', icon: 'fa-car' },
    { id: 5, name: 'Luxury Hotel Stay', category: 'Accommodation', provider: 'Grand City Hotel', price: '$120/night', status: 'draft', icon: 'fa-hotel' }
  ];

  get filteredServices() {
    return this.services.filter(s => {
      const matchesSearch = this.searchTerm
        ? s.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesCategory = this.filterCategory
        ? s.category.toLowerCase() === this.filterCategory.toLowerCase()
        : true;
      const matchesStatus = this.filterStatus
        ? s.status === this.filterStatus
        : true;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  editService(id: number) {
    this.router.navigate(['/home/admin/services', id, 'edit']);
  }

  viewService(id: number) {
    console.log('View service', id);
  }

  deleteService(id: number) {
    console.log('Delete service', id);
    this.services = this.services.filter(s => s.id !== id);
  }
  createService() {
    this.router.navigate(['/home/admin/service-create']);
  }
}
