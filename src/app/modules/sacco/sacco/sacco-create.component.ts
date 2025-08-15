import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { AGENT_CATEGORY } from 'src/app/core/constants/master-data';
import { SaccosService } from 'src/app/core/services/sacco.service';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';
import { ApiSignals } from 'src/app/core/services/base-api.service';

@Component({
  selector: 'app-sacco-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DisableAfterClickDirective],
  templateUrl: './sacco-create.component.html',
})
export class SaccoCreateComponent {
  currentStep = 1;
  totalSteps = 2;
  isSubmitting = false;
  saccoCategories: any[] = [];

  userForm!: FormGroup;
  saccoForm!: FormGroup;

  // Make this a signal so effect tracks changes
  createServiceSignals = signal<ApiSignals<any> | null>(null);

  constructor(
    private fb: FormBuilder,
    private saccoService: SaccosService,
    private alertService: AlertService
  ) {
    // Reactive side effect for API changes
    effect(() => {
      const sigs = this.createServiceSignals();
      if (!sigs) return;

      if (sigs.loading()) {
        console.log('Loading...');
      }

      if (sigs.success()) {
        this.userForm.reset();
        this.saccoForm.reset();
        this.isSubmitting = false;
        this.alertService.showSuccess('SACCO Created!', { route: '/home/admin/sacco-list' });
      }

      if (sigs.failure()) {
        this.isSubmitting = false;
        this.alertService.showError(sigs.error()!);
      }
    });
  }

  ngOnInit(): void {
    this.initForms();
    this.saccoCategories = AGENT_CATEGORY;
  }

  private initForms(): void {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );

    this.saccoForm = this.fb.group({
      agentName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      location: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      AgentCategory: [0, Validators.required],
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
      ...this.saccoForm.value,
    };

    // Store signals in a reactive wrapper
    this.createServiceSignals.set(this.saccoService.create(payload));
  }
}
