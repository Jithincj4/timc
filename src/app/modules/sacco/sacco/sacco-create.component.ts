// src/app/components/sacco-create/sacco-create.component.ts
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { AGENT_CATEGORY } from 'src/app/core/constants/master-data';
import { SaccosService } from 'src/app/core/services/sacco.service';

@Component({
  selector: 'app-sacco-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './sacco-create.component.html'
})
export class SaccoCreateComponent implements OnInit {
  
  currentStep = 1;
  totalSteps = 2;
  isSubmitting = false;
  saccoCategories: any[] = [];
  userForm!: FormGroup;
  saccoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private saccoService: SaccosService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadSaccoCategories();
  }
  loadSaccoCategories() {
    // Replace with API if available
    this.saccoCategories = AGENT_CATEGORY;
  }

  private initForms(): void {
    // Step 1: User account form
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Step 2: SACCO details form
    this.saccoForm = this.fb.group({
      agentName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      location: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      AgentCategory:[0, Validators.required],
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitSacco(): void {
    if (this.userForm.invalid || this.saccoForm.invalid) {
      this.userForm.markAllAsTouched();
      this.saccoForm.markAllAsTouched();
      return;
    }
  
    this.isSubmitting = true;
  
    const payload = {
      ...this.userForm.value,
      ...this.saccoForm.value
    };
  
    // Call the service and get signals
    const api = this.saccoService.create(payload);
  
    // Subscribe to trigger the API call
    api.result$.subscribe(res => {
      this.isSubmitting = api.loading(); // reflect loading
  
      if (api.success()) {
        this.alertService.showSuccess('Sacco created successfully.');
        this.userForm.reset();
        this.saccoForm.reset();
        // optionally navigate or reload list
      }
  
      if (api.failure()) {
        this.alertService.showError('Failed to create Sacco: ' + api.error());
      }
    });
  }
}
