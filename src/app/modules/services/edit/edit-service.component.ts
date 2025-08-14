import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-service.component.html',
})
export class EditServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  selectedCategory: string = '';
  serviceId!: string;

  // Example category list for template loop
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    // Create form structure
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceCode: ['', Validators.required],
      serviceStatus: ['active', Validators.required],
      price: [0, Validators.required],
      duration: [''],
      discountPercentage: [0],
      taxPercentage: [0],
      description: [''],
      highlights: ['']
    });

    // Get ID from route
    this.serviceId = this.route.snapshot.paramMap.get('id') || '';

    if (this.serviceId) {
      this.loadServiceData();
    }
  }

  loadServiceData() {
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (data:any) => {
        // Patch form with API data
        this.serviceForm.patchValue({
          serviceName: data.name,
          serviceCode: data.code,
          serviceStatus: data.status,
          price: data.price,
          duration: data.duration,
          discountPercentage: data.discountPercentage,
          taxPercentage: data.taxPercentage,
          description: data.description,
          highlights: data.highlights
        });
        this.selectedCategory = data.category;
      },
      error: (err) => {
        console.error('Failed to load service', err);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  onSubmit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const updatedService = {
      ...this.serviceForm.value,
      category: this.selectedCategory
    };

    this.serviceService.updateService(this.serviceId, updatedService).subscribe({
      next: () => {
        this.router.navigate(['/home/admin/service-management']);
      },
      error: (err) => {
        console.error('Failed to update service', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/manage-services']);
  }
}
