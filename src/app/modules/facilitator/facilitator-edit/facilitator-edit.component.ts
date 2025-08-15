// src/app/components/facilitator-edit/facilitator-edit.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';
import { UpdateFacilitatorDto } from 'src/app/core/models/facilitator.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { AdminService } from '../../admin/admin.service';
import { FacilitatorService } from '../../../core/services/facilitator.service';

@Component({
  selector: 'app-facilitator-edit',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, DisableAfterClickDirective],
  templateUrl: './facilitator-edit.component.html',
})
export class FacilitatorEditComponent implements OnInit {
  userForm!: FormGroup;
  facilitatorForm!: FormGroup;
  specializations: any[] = [];
  loading = false;
  isSavingUser = false;

  userId!: string;
  facilitatorId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public facilitatorService: FacilitatorService, // public so we can bind signals in template
    private userService: AdminService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.facilitatorId = this.route.snapshot.paramMap.get('facilitatorId') ?? '';
    this.initForms();
    this.loadData();
  }

  private initForms(): void {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator },
    );

    this.facilitatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      organisationName: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      specializationIds: [[], Validators.required],
    });
  }

  private loadData(): void {
    // Load specializations
    this.facilitatorService.getSpecializations().subscribe((sp) => {
      this.specializations = sp;
    });

    if (!this.facilitatorId) return;

    // Use signal-enabled getOne for facilitator
    const facilitatorSignals = this.facilitatorService.getOne(this.facilitatorId);

    facilitatorSignals.result$.subscribe((facilitator) => {
      if (!facilitator) return;

      this.userId = facilitator.userId?.toString() || '';

      // Fetch user details
      const signal= this.userService.getOne(this.userId);
      
      effect(() => {
        this.loading = signal.loading();
        if (signal.success()) {
          this.userForm.patchValue({
            username: signal.data().username,
            email: signal.data().email,
          });
        }
      });

      // Patch facilitator form
      this.facilitatorForm.patchValue({
        firstName: facilitator.firstName,
        lastName: facilitator.lastName,
        licenseNumber: facilitator.licenseNumber,
        organisationName: facilitator.organisationName,
        yearsOfExperience: facilitator.yearsOfExperience,
        specializationIds: facilitator.specializations.map((s: any) => s.specializationId),
      });
    });
  }

  saveFacilitatorDetails(): void {
    if (this.facilitatorForm.invalid) {
      this.facilitatorForm.markAllAsTouched();
      return;
    }
  
    this.loading = true;
  
    const dto: UpdateFacilitatorDto = {
      facilitatorId: Number(this.facilitatorId),
      ...this.facilitatorForm.value,
    };
  
    // Call the service
    const api = this.facilitatorService.updateFacilitator(dto);
  
    // Subscribe to actually trigger the request
    api.result$.subscribe(() => {
      this.loading = api.loading();
  
      if (api.success()) {
        this.alertService.showSuccess('Facilitator details updated successfully.');
      }
  
      if (api.failure()) {
        this.alertService.showError('Failed to update facilitator details: ' + api.error());
      }
    });
  }
  
  saveUserAccount(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
  
    const data = { ...this.userForm.value };
  
    // Remove password fields if blank (no change)
    if (!data.password) {
      delete data.password;
      delete data.confirmPassword;
    }
  
    const signals = this.userService.update(this.userId, data);
  
    this.isSavingUser = true;
  
    // Subscribe to trigger the HTTP request and react to signals
    signals.result$.subscribe(() => {
      this.isSavingUser = signals.loading();
  
      if (signals.success()) {
        this.alertService.showSuccess('User account updated successfully.');
      }
  
      if (signals.failure()) {
        this.alertService.showError(signals.error() || 'Failed to update user account.');
      }
    });
  }
  
  
  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }
}


