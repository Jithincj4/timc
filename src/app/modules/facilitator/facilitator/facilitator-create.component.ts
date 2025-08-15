// src/app/components/facilitator-create/facilitator-create.component.ts
import { Component, OnInit, effect, signal } from '@angular/core';
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
import { ApiSignals } from 'src/app/core/services/base-api.service';

@Component({
  selector: 'app-facilitator-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DisableAfterClickDirective
  ],
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

  selectedSpecializationIds: number[] = [];
  userId: number | null = null;
  isSubmitting = false;

  // Signal for tracking API request state
  createServiceSignals = signal<ApiSignals<any> | null>(null);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private facilitatorService: FacilitatorService,
    public router: Router,
    private alertService: AlertService
  ) {
    // Track API state reactively
    effect(() => {
      const sigs = this.createServiceSignals();
      if (!sigs) return;

      if (sigs.loading()) {
        this.isSubmitting = true;
      } else {
        this.isSubmitting = false;
      }

      if (sigs.success()) {
        this.alertService.showSuccess('Facilitator created successfully.', { route: '/home/admin/facilitator-list' });
        this.resetForms();
      }

      if (sigs.failure()) {
        this.alertService.showError(sigs.error() || 'Failed to create facilitator.');
      }
    });
  }

  ngOnInit(): void {
    this.initializeForms();
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

  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.userForm.invalid) {
        this.markFormGroupTouched(this.userForm);
        return;
      }
      this.createFacilitatorRequest.userDto = { ...this.userForm.value, roleId: 3 };
      this.currentStep++;
    } else if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitFacilitator(): void {
    if (this.facilitatorForm.invalid) {
      this.markFormGroupTouched(this.facilitatorForm);
      return;
    }

    const request: CreateFacilitatorRequest = {
      userDto: this.createFacilitatorRequest.userDto,
      facilitatorDto: { ...this.facilitatorForm.value }
    };

    // Store API signals (no subscribe, no duplicate calls)
    this.createServiceSignals.set(this.facilitatorService.create(request));
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
    this.createFacilitatorRequest = {} as CreateFacilitatorRequest;
  }

  getStepTitle(step: number): string {
    switch (step) {
      case 1: return 'User Account';
      case 2: return 'Facilitator Details';
      default: return '';
    }
  }
}
