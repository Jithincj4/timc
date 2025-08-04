import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MockUserService } from '../../services/mock-user.service';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showPassword = false;
  currentStep = 0;
  uploadedFileName: string | null = null;
  
  steps = [
    { title: 'Personal Information' },
    { title: 'Identification Details' },
    { title: 'Finalize Registration' }
  ];
  
  genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];
  
  idTypes = [
    { value: 'Passport', label: 'Passport' },
    { value: 'National ID', label: 'National ID' }
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private dialog: MatDialog, 
    private userService: MockUserService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        nationality: ['', Validators.required],
        identificationType: ['', Validators.required],
        passportNumber: ['', Validators.required],
        passportExpiryDate: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        idDocument: [null, Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.signUpForm.patchValue({ idDocument: file });
      this.uploadedFileName = file.name;
    }
  }

  openDatePicker(fieldName: string): void {
    console.log(`Date picker opened for field: ${fieldName}`);
    // Add logic to open the date picker if applicable
  }

  onNavigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1 && this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        // Personal Information step
        return !!this.signUpForm.get('fullName')?.valid &&
               !!this.signUpForm.get('dateOfBirth')?.valid &&
               !!this.signUpForm.get('email')?.valid &&
               !!this.signUpForm.get('password')?.valid 
             
      case 1:
        // Identification Details step
        return !!this.signUpForm.get('identificationType')?.valid &&
               !!this.signUpForm.get('passportNumber')?.valid &&
               !!this.signUpForm.get('passportExpiryDate')?.valid &&
               !!this.signUpForm.get('nationality')?.valid &&
               !!this.signUpForm.get('gender')?.valid;
      case 2:
        // Finalize Registration step
        return this.uploadedFileName !== null &&
               !!this.signUpForm.get('acceptTerms')?.valid;
      default:
        return true;
    }
  }

  onSubmit(): void {
    if (this.signUpForm.invalid || this.currentStep !== this.steps.length - 1) return;
    
    const formValue = this.signUpForm.value;
    
    // Add user details
    this.userService.addUser({
      username: formValue.email,
      password: formValue.password,
      userType: 0, // 0 for Patient
    });
    
    // Add patient details
    this.userService.addPatientDetails({
      fullName: formValue.fullName,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      nationality: formValue.nationality,
      identificationType: formValue.identificationType,
      passportNumber: formValue.passportNumber,
      passportExpiryDate: formValue.passportExpiryDate,
      email: formValue.email,
    });
    
    // Show success dialog
    this.dialog.open(SuccessDialogComponent, {
      data: {
        title: 'Registration Successful',
        message: 'Your account has been created successfully!',
        buttonText: 'Go to Dashboard'
      }
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}