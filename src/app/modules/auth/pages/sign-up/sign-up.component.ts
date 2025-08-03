import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MockUserService } from '../../services/mock-user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [ButtonComponent,   CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule ,AngularSvgIconModule, ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog, private userService: MockUserService) {}

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
      { validators: this.passwordMatchValidator },
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
    }
  }
  openDatePicker(fieldName: string): void {
    console.log(`Date picker opened for field: ${fieldName}`);
    // Add logic to open the date picker if applicable
  }
  onNavigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
  //oN SUBMIT CALL USER SERVICE TO ADD USER AND PATIENT DETAILS
  onSubmit(): void {
    if (this.signUpForm.invalid) return;

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

    this.router.navigate(['/dashboard']);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
