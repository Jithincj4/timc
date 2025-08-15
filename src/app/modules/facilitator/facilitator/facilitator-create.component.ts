// src/app/components/facilitator-create/facilitator-create.component.ts
import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { FacilitatorService } from '../../../core/services/facilitator.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Specialization, Language, CreateFacilitatorRequest } from 'src/app/core/models/facilitator.model';
import { SPECIALIZATION_DATA } from 'src/app/core/constants/master-data';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';

@Component({
  selector: 'app-facilitator-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, DisableAfterClickDirective],
  templateUrl: './facilitator-create.component.html',
  styleUrls: ['./facilitator-create.component.css'],
})
export class FacilitatorCreateComponent implements OnInit {
  currentStep = 1;
  totalSteps = 2;

  createFacilitatorRequest: CreateFacilitatorRequest = {} as CreateFacilitatorRequest;

  userForm!: FormGroup;
  facilitatorForm!: FormGroup;

  languages: Language[] = [
    { languageId: 1, languageName: 'English' },
    { languageId: 2, languageName: 'Swahili' },
    { languageId: 3, languageName: 'French' },
  ];

  specializations: Specialization[] = SPECIALIZATION_DATA;

  dropdownOptions = this.specializations.map((s) => ({
    label: s.specializationName,
    value: s.specializationId,
  }));

  selectedSpecializationIds: number[] = [];
  userId: number | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private facilitatorService: FacilitatorService,
    public router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadReferenceData();
  }

  initializeForms(): void {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.facilitatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      licenseNumber: ['', Validators.required],
      organisationName: ['', Validators.required],
      address: [''],
      city: [''],
      country: [''],
      idType: [''],
      idNumber: [''],
      dateOfBirth: [''],
      gender: [''],
      languageIds: [[]],
      yearsOfExperience: ['', [Validators.required, Validators.min(0)]],
      specializationIds: [[], Validators.required],
    });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  loadReferenceData(): void {
    // Placeholder for async fetch if needed
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.userForm.invalid) {
        this.markFormGroupTouched(this.userForm);
        return;
      }
      this.isSubmitting = true;
      this.createFacilitatorRequest.userDto = { ...this.userForm.value, roleId: 3 };
      this.currentStep++;
      this.isSubmitting = false;
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
  
    this.isSubmitting = true;
  
    const request: CreateFacilitatorRequest = {
      userDto: this.createFacilitatorRequest.userDto,
      facilitatorDto: { ...this.facilitatorForm.value }
    };
  
    const signals = this.facilitatorService.create(request);
  
    signals.result$.subscribe(() => {
      this.isSubmitting = signals.loading();
  
      if (signals.success()) {
        this.alertService.showSuccess('Facilitator created successfully.');
        this.facilitatorForm.reset();
      }
  
      if (signals.failure()) {
        this.alertService.showError(signals.error() || 'Failed to create facilitator.');
      }
    });
  }
  

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
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
    switch (step) {
      case 1: return 'User Account';
      case 2: return 'Facilitator Details';
      default: return '';
    }
  }
}
