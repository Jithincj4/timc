import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { c } from 'node_modules/@angular/material/dialog.d-hlN3f-Hk';

@Component({
  selector: 'app-service-create-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './service-create.component.html'
})
export class ServiceCreateFormComponent implements OnInit {
  serviceForm!: FormGroup;
  selectedCategory: string | null = null;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceCode: ['', Validators.required],
      serviceStatus: ['active', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      discountPercentage: [0],
      taxPercentage: [0],
      description: ['', Validators.required],
      highlights: [''],
      inclusions: [''],
      exclusions: [''],
      termsConditions: [''],
      videoUrl: [''],
      brochureUrl: [''],
      availabilityStart: [''],
      availabilityEnd: [''],
      bookingNotice: [0],
      images: [[]]
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    console.log('Category selected:', category);
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.serviceForm.patchValue({ images: [file] });
      this.serviceForm.get('images')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      console.log('Service Data Submitted:', this.serviceForm.value);
      // TODO: Call your backend API here
    } else {
      console.warn('Form is invalid.');
    }
  }

  onReset(): void {
    this.serviceForm.reset({
      serviceStatus: 'active',
      price: 0,
      discountPercentage: 0,
      taxPercentage: 0,
      bookingNotice: 0
    });
    this.imagePreview = null;
    this.selectedCategory = null;
  }

  onSaveDraft(): void {
    const draftData = { ...this.serviceForm.value, serviceStatus: 'draft' };
    console.log('Draft Saved:', draftData);
    // TODO: Save draft to backend or local storage
  }
}
