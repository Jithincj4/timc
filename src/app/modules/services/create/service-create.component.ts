import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-create-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-create.component.html'
})
export class ServiceCreateFormComponent implements OnInit {
  serviceForm!: FormGroup;
  currentStep = 1;
  selectedCategory: number | null = null;
  imagePreview: string | null = null;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      // Step 1
      name: ['', Validators.required],
      provider: [''],
      status: ['active', Validators.required],
      currency: ['USD', Validators.required],

      // Step 2
      category: [0, Validators.required],

      // Step 3
      price: [0, [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      discount: [0],
      tax: [0],

      // Step 4
      description: ['', Validators.required],
      keyHighlights: [''],
      inclusions: [''],
      exclusions: [''],
      termsAndConditions: [''],

      // Step 5
      videoUrl: [''],
      brochureUrl: [''],
      images: [[]],

      // Step 6
      availableFrom: [''],
      availableUntil: [''],
      bookingNotice: [0]
    });
  }

  /** Category Selection */
  selectCategory(category: any): void {
    this.selectedCategory = category;
    this.serviceForm.patchValue({ category: category});
  }

  /** Image Upload Preview */
  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.serviceForm.patchValue({ images: [file] });
      this.serviceForm.get('images')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  /** Step Navigation */
  goToStep(step: number): void {
    if (step >= 1 && step <= 6) {
      this.currentStep = step;
    }
  }

  /** Submit */
  onSubmit(): void {
    if (this.serviceForm.valid) {
      console.log('Service Data Submitted:', this.serviceForm.value);
      // TODO: Call backend API
    } else {
      console.warn('Form is invalid.');
    }
  }

  /** Reset */
  onReset(): void {
    this.serviceForm.reset({
      status: 'active',
      currency: 'USD',
      price: 0,
      discount: 0,
      tax: 0,
      bookingNotice: 0
    });
    this.imagePreview = null;
    this.selectedCategory = null;
    this.currentStep = 1;
  }

  /** Save Draft */
  onSaveDraft(): void {
    const draftData = { ...this.serviceForm.value, status: 'draft' };
    console.log('Draft Saved:', draftData);
    // TODO: Save draft to backend or localStorage
  }
}
