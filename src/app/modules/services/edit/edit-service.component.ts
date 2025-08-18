// src/app/components/service-edit/service-edit.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ApiSignals } from 'src/app/core/services/base-api.service';
import { ServiceDto } from 'src/app/core/models/service.model';
import { AppService } from 'src/app/core/services/app-service.service';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DisableAfterClickDirective],
  templateUrl: './edit-service.component.html',
})
export class EditServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId!: string;
  selectedCategory: number | null = null;
  categories = [
    { 
      id: 1, 
      value: 'medical-procedure', 
      label: 'Medical Procedure', 
      icon: 'fas fa-procedures', 
      description: 'Specialized medical and surgical treatments', 
      isActive: true, 
      createdAt: '2025-08-18T07:21:45.3792987', 
      updatedAt: null 
    },
    { 
      id: 2, 
      value: 'wellness', 
      label: 'Wellness Package', 
      icon: 'fas fa-spa', 
      description: 'Spa and holistic wellness experiences', 
      isActive: true, 
      createdAt: '2025-08-18T07:21:45.3792987', 
      updatedAt: null 
    },
    { 
      id: 3, 
      value: 'diagnostic', 
      label: 'Diagnostic', 
      icon: 'fas fa-x-ray', 
      description: 'Laboratory and diagnostic tests', 
      isActive: true, 
      createdAt: '2025-08-18T07:21:45.3792987', 
      updatedAt: null 
    },
    { 
      id: 4, 
      value: 'accommodation', 
      label: 'Accommodation', 
      icon: 'fas fa-hotel', 
      description: 'Hotels and lodging for patients & family', 
      isActive: true, 
      createdAt: '2025-08-18T07:21:45.3792987', 
      updatedAt: null 
    },
    { 
      id: 5, 
      value: 'transport', 
      label: 'Transport', 
      icon: 'fas fa-car', 
      description: 'Travel and airport transfers', 
      isActive: true, 
      createdAt: '2025-08-18T07:21:45.3792987', 
      updatedAt: null 
    }
  ];
  

  // Signals
  updateServiceSignals = signal<ApiSignals<any> | null>(null);
  loadServiceSignals = signal<ApiSignals<ServiceDto> | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private serviceService: AppService,
    private alertService: AlertService,
  ) {
    // Handle update effects
    effect(() => {
      const sig = this.updateServiceSignals();
      if (!sig) return;

      if (sig.loading()) return;

      if (sig.success()) {
        this.router.navigate(['/home/admin/service-management']);
      }

      if (sig.failure()) {
        this.alertService.showError(sig.error() || 'Failed to update service.');
      }
    });

    // Handle load service effects
    effect(() => {
      const sig = this.loadServiceSignals();
      if (!sig) return;

      if (sig.success() && sig.data()) {
        const data = sig.data();
      
        this.serviceForm.patchValue({
          serviceName: data!.name,
          serviceCode: `S00${data!.id}`,
          provider: data!.provider,
          price: data!.price,
          currency: data!.currency,
          duration: data!.duration,
          serviceStatus: data!.status,
          categoryId: data!.categoryId,
          description: data!.description,
          discountPercentage: data!.discount || 0,
          taxPercentage: data!.tax || 0,
          highlights: data!.keyHighlights || '',
      
          // 📌 New fields
          inclusions: data!.inclusions || '',
          exclusions: data!.exclusions || '',
          termsAndConditions: data!.termsAndConditions || '',
          videoUrl: data!.videoUrl || '',
          brochureUrl: data!.brochureUrl || '',
          image: data!.image || '',
          availableFrom: data!.availableFrom,
          availableUntil: data!.availableUntil,
          bookingNotice: data!.bookingNotice,
        });
      
        this.selectedCategory = data!.categoryId;
      }

      if (sig.failure()) {
        this.alertService.showError(sig.error() || 'Failed to load service.');
      }
    });
  }
  
  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') ?? '';
    this.initForm();
    this.loadCategories();
    if (this.serviceId) {
      this.loadServiceSignals.set(this.serviceService.getOne(this.serviceId));
    }
  }
  selectCategory(value: number) {
    this.selectedCategory = value;
  
    // Sync with form control
    this.serviceForm.patchValue({
      category: value
    });
  }
  private initForm(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      provider: ['', Validators.required],
      serviceCode: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      currency: ['USD', Validators.required],
      status: ['active', Validators.required],
      categoryId: [null, Validators.required],
      description: [''],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      serviceStatus: ['draft'],
      taxPercentage: [0, [Validators.min(0), Validators.max(100)]],
      highlights: [''],
  
      // 📌 New fields
      inclusions: [''],
      exclusions: [''],
      termsAndConditions: [''],
      videoUrl: [''],
      brochureUrl: [''],
      image: [''],
      availableFrom: [''],
      availableUntil: [''],
      bookingNotice: [null],
    });
  }
  
  private loadCategories(): void {
    // Ideally this comes from API
    this.categories = [
      { 
        id: 1, 
        value: 'medical-procedure', 
        label: 'Medical Procedure', 
        icon: 'fas fa-procedures', 
        description: 'Specialized medical and surgical treatments', 
        isActive: true, 
        createdAt: '2025-08-18T07:21:45.3792987', 
        updatedAt: null 
      },
      { 
        id: 2, 
        value: 'wellness', 
        label: 'Wellness Package', 
        icon: 'fas fa-spa', 
        description: 'Spa and holistic wellness experiences', 
        isActive: true, 
        createdAt: '2025-08-18T07:21:45.3792987', 
        updatedAt: null 
      },
      { 
        id: 3, 
        value: 'diagnostic', 
        label: 'Diagnostic', 
        icon: 'fas fa-x-ray', 
        description: 'Laboratory and diagnostic tests', 
        isActive: true, 
        createdAt: '2025-08-18T07:21:45.3792987', 
        updatedAt: null 
      },
      { 
        id: 4, 
        value: 'accommodation', 
        label: 'Accommodation', 
        icon: 'fas fa-hotel', 
        description: 'Hotels and lodging for patients & family', 
        isActive: true, 
        createdAt: '2025-08-18T07:21:45.3792987', 
        updatedAt: null 
      },
      { 
        id: 5, 
        value: 'transport', 
        label: 'Transport', 
        icon: 'fas fa-car', 
        description: 'Travel and airport transfers', 
        isActive: true, 
        createdAt: '2025-08-18T07:21:45.3792987', 
        updatedAt: null 
      }
    ];
    
  }

  saveService(): void {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const dto = {
      serviceId: Number(this.serviceId),
      ...this.serviceForm.value,
    };

    this.updateServiceSignals.set(this.serviceService.updateService(dto));
  }

  cancel(): void {
    this.router.navigate(['/home/admin/service-management']);
  }
}
