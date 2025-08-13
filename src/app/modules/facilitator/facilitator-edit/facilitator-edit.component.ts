// src/app/components/facilitator-edit/facilitator-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilitatorService } from '../facilitator.service';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { UpdateFacilitatorDto } from 'src/app/core/models/facilitator.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';


@Component({
  selector: 'app-facilitator-edit',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,DisableAfterClickDirective],
  templateUrl: './facilitator-edit.component.html'
})
export class FacilitatorEditComponent implements OnInit {
  userForm!: FormGroup;
  facilitatorForm!: FormGroup;
  specializations: any[] = [];

  isSavingUser = false;
  isSavingFacilitator = false;

  userId!: string;
  facilitatorId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private facilitatorService: FacilitatorService,
    private userService: AdminService,
    private alertService: AlertService  
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
        confirmPassword: ['']
      },
      { validators: this.passwordMatchValidator }
    );

    this.facilitatorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      organisationName: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      specializationIds: [[], Validators.required]
    });
  }

  private loadData(): void {
    // Load dropdowns first
    this.facilitatorService.getSpecializations().subscribe(sp => {
      this.specializations = sp;
    });


    // Load facilitator details
    if (this.facilitatorId) {
      this.facilitatorService.getFacilitatorById(this.facilitatorId).subscribe(facilitator => {
        this.userId = facilitator.userId; // Store userId for later use
        this.userService.getUserById(this.userId).subscribe(user => {
            this.userForm.patchValue({
              username: user.username,
              email: user.email
            });
          });

          facilitator.specializations.forEach((element: any) => {
            this.facilitatorForm.get('specializationIds')?.value.push(element.specializationId);
          });
         
         this.facilitatorForm.patchValue({
           firstName: facilitator.firstName,
           lastName: facilitator.lastName,
           licenseNumber: facilitator.licenseNumber,
           organisationName: facilitator.organisationName,
           yearsOfExperience: facilitator.yearsOfExperience
         });
       });
    }
    
  }

  // Custom validator for password match
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  saveUserAccount(): void {
    if (this.userForm.invalid) return;

    this.isSavingUser = true;
    const data = { ...this.userForm.value };

    // Remove password fields if blank (no change)
    if (!data.password) {
      delete data.password;
      delete data.confirmPassword;
    }

    this.userService.updateUser(this.userId, data).subscribe({
      next: () => {
        this.isSavingUser = false;
        alert('User account updated successfully.');
      },
      error: err => {
        this.isSavingUser = false;
        console.error(err);
      }
    });
  }

  saveFacilitatorDetails(): void {
    if (this.facilitatorForm.invalid) return;
  
    const formValue = this.facilitatorForm.value;
  
    // Prepare DTO for backend
    const dto: UpdateFacilitatorDto = {
      facilitatorId: Number(this.facilitatorId), // Convert string to number
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      licenseNumber: formValue.licenseNumber || null,
      organisationName: formValue.organisationName || null,
      yearsOfExperience: formValue.yearsOfExperience || null,
      specializationIds: formValue.specializationIds || [],
    };
  
    this.isSavingFacilitator = true;
    this.facilitatorService.updateFacilitator(dto).subscribe({
      next: () => {
        this.isSavingFacilitator = false;
       this.alertService.showSuccess('Facilitator details updated successfully.');
      },
      error: (err) => {
        this.isSavingFacilitator = false;
        this.alertService.showError('Failed to update facilitator details: ' + err.message);
      },
    });
  }
  
}
