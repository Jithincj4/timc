// src/app/components/facilitator-edit/facilitator-edit.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';
import { UpdateFacilitatorDto } from 'src/app/core/models/facilitator.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { AdminService } from '../../admin/admin.service';
import { FacilitatorService } from '../../../core/services/facilitator.service';
import { ApiSignals } from 'src/app/core/services/base-api.service';
import { User } from 'src/app/core/state/auth.store.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-facilitator-edit',
  standalone: true,
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

  // Signals to store API responses
  updateFacilitatorSignals = signal<ApiSignals<any> | null>(null);
  updateUserSignals = signal<ApiSignals<any> | null>(null);
  loadUserSignals = signal<ApiSignals<any> | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public facilitatorService: FacilitatorService,
    private userService: UserService,
    private alertService: AlertService,
  ) {
    // Handle update facilitator effects
    effect(() => {
      const sig = this.updateFacilitatorSignals();
      if (!sig) return;

      this.loading = sig.loading();

      if (sig.success()) {
        this.alertService.showSuccess('Facilitator details updated successfully.');
      }

      if (sig.failure()) {
        this.alertService.showError('Failed to update facilitator details: ' + sig.error());
      }
    });

    // Handle update user effects
    effect(() => {
      const sig = this.updateUserSignals();
      if (!sig) return;

      this.isSavingUser = sig.loading();

      if (sig.success()) {
        this.alertService.showSuccess('User account updated successfully.');
      }

      if (sig.failure()) {
        this.alertService.showError(sig.error() || 'Failed to update user account.');
      }
    });

    // Handle load user effects
    effect(() => {
      const sig = this.loadUserSignals();
      if (!sig) return;

      this.loading = sig.loading();

      if (sig.success() && sig.data()) {
        this.userForm.patchValue({
          username: sig.data().username,
          email: sig.data().email,
        });
      }
    });
  }

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
    this.facilitatorService.getSpecializations().subscribe((sp) => {
      this.specializations = sp;
    });

    if (!this.facilitatorId) return;

    const facilitatorSignals = this.facilitatorService.getOne(this.facilitatorId);

    facilitatorSignals.result$.subscribe((facilitator) => {
      if (!facilitator) return;

      this.userId = facilitator.userId?.toString() || '';
      this.loadUserSignals.set(this.userService.getOne(this.userId));

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

    const dto: UpdateFacilitatorDto = {
      facilitatorId: Number(this.facilitatorId),
      ...this.facilitatorForm.value,
    };

    this.updateFacilitatorSignals.set(this.facilitatorService.updateFacilitator(dto));
  }

  saveUserAccount(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const data = { ...this.userForm.value };

    if (!data.password) {
      delete data.password;
      delete data.confirmPassword;
    }

    this.updateUserSignals.set(this.userService.update(this.userId, data));
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }
}
