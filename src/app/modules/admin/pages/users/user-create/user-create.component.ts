import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-create.component.html'
})
export class CreateUserComponent {
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Facilitator' },
    { id: 3, name: 'Patient' },
  ];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, 
    private dialog: MatDialog, ) {
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
      this.adminService.createUser(user).subscribe({
        next: () => {this.saved.emit();this.dialog.open(SuccessDialogComponent, {
              data: {
                title: 'Registration Successful',
                message: 'Account has been created successfully!',
                buttonText: 'Go to list'
              }
            })},   // emit event
        error: (err) => console.error(err)
      });
    }
  }
}
