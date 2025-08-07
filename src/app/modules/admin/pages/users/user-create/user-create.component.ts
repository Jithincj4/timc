import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { AdminService } from '../../../admin.service';
import { AdminUserFormComponent } from "./admin-user-form.component";
import { PatientUserFormComponent } from "./app-patient-user-form.component";
import { FacilitatorUserFormComponent } from "./facilitator-user-form.component";
import { SaccoUserFormComponent } from "./sacco-user-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  imports: [AdminUserFormComponent,FormsModule,CommonModule , PatientUserFormComponent, FacilitatorUserFormComponent, SaccoUserFormComponent]
})
export class UserCreateComponent {
  @Output() saved = new EventEmitter<void>();
  selectedType: string = '';
  isPatient = false;
  form: FormGroup;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Facilitator' },
    { id: 3, name: 'Patient' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: [3, Validators.required],
      isActive: [true]
    });
  }

  submit() {
    if (this.form.valid) {
      const user: UserDto = this.form.value;
      this.userService.createUser(user).subscribe({
        next: () => {
          this.saved.emit();
          this.dialog.open(SuccessDialogComponent, {
            data: {
              title: 'Registration Successful',
              message: 'Account has been created successfully!',
              buttonText: 'Go to list'
            }
          });
        },
        error: (err) => console.error(err)
      });
    }
  }
}