// src/app/components/facilitator-create/facilitator-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Specialization, FacilitatorDetails,Language } from 'src/app/core/models/facilitator.model';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacilitatorService } from './facilitator.service';
import { User } from '../../uikit/pages/table/model/user.model';


@Component({
  selector: 'app-facilitator-create',
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './facilitator-create.component.html',
  styleUrls: ['./facilitator-create.component.css']
})
export class FacilitatorCreateComponent implements OnInit {
  currentStep = 1;
  totalSteps = 2;
  
  userForm!: FormGroup;
  facilitatorForm!: FormGroup;
  
  languages: Language[] = [
    { languageId: 1, languageName: 'English' },
    { languageId: 2, languageName: 'Swahili' },
    { languageId: 3, languageName: 'French' }
  ];
  specializations: Specialization[] =[
    { specializationId: 1, specializationName: 'Medical Agent', categoryId: 4, categoryName: 'Medical Agent' },
    { specializationId: 2, specializationName: 'Travel Agent', categoryId: 2, categoryName: 'Travel Agent' },
    { specializationId: 3, specializationName: 'Booking Agent', categoryId: 1, categoryName: 'Booking Agent' },
    { specializationId: 4, specializationName: 'Insurance Agent', categoryId: 3, categoryName: 'Insurance Agent' },
    { specializationId: 5, specializationName: 'Medical Tourism', categoryId: 5, categoryName: 'Medical Tourism' },
    { specializationId: 6, specializationName: 'Healthcare Consultant', categoryId: 4, categoryName: 'Medical Agent' }
  ];
  
  userId: number | null = null;
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder,
    private facilitatorService: FacilitatorService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadReferenceData();
  }

  initializeForms(): void {
    // User Account Form
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Facilitator Details Form
    this.facilitatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      country: [''],
      idType: [''],
      idNumber: [''],
      dateOfBirth: [''],
      gender: [''],
      languageIds: [[], Validators.required],
      specializationIds: [[], Validators.required]
    });
  }

  passwordMatchValidator(form: FormGroup): Validators {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    return password === confirmPassword?true  : { passwordMismatch: true };
  }

  loadReferenceData(): void {
   
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.userForm.invalid) {
        this.markFormGroupTouched(this.userForm);
        return;
      }
      
      this.isSubmitting = true;
      const userAccount: User = this.userForm.value;
      
      this.facilitatorService.createUser(userAccount).subscribe({
        next: (response) => {
          this.userId = response.i;
          this.currentStep++;
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.isSubmitting = false;
          // Handle error (show message to user)
        }
      });
    } else {
      this.currentStep++;
    }
  }

  previousStep(): void {
    this.currentStep--;
  }

  submitFacilitator(): void {
    if (this.facilitatorForm.invalid) {
      this.markFormGroupTouched(this.facilitatorForm);
      return;
    }
    
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }
    
    this.isSubmitting = true;
    const facilitatorDetails: FacilitatorDetails = this.facilitatorForm.value;
    
    this.facilitatorService.createFacilitator(facilitatorDetails, this.userId).subscribe({
      next: (response) => {
        console.log('Facilitator created successfully:', response);
        this.isSubmitting = false;
        // Navigate to success page or show success message
        this.resetForms();
      },
      error: (error) => {
        console.error('Error creating facilitator:', error);
        this.isSubmitting = false;
        // Handle error (show message to user)
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForms(): void {
    this.userForm.reset();
    this.facilitatorForm.reset();
    this.currentStep = 1;
    this.userId = null;
  }

  getStepTitle(step: number): string {
    switch(step) {
      case 1: return 'User Account';
      case 2: return 'Facilitator Details';
      default: return '';
    }
  }
}