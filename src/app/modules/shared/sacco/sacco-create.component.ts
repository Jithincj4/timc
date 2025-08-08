import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { ClickLockService } from 'src/app/core/services/click-lock.service';
import { AuthStore } from 'src/app/core/state/auth.store.service';

@Component({
  selector: 'app-sacco-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sacco-create.component.html',
})
export class SaccoCreateComponent implements OnInit {
  saccoForm!: FormGroup;
  authStore=Inject(AuthStore)
 
  facilitators: any[] = [];
  loading = false;
  userCreated = false; // controls SACCO field enabling
  createdUserId!: number;

  constructor(
    public clickLock: ClickLockService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.saccoForm = this.fb.group({
      name: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }, Validators.required],
      facilitatorId: [{ value: null, disabled: true }],
      userId: [null],
    });

    this.adminService.getFacilitators().subscribe((data) => {
      this.facilitators = data;
    });
  }

  createUserAccount() {
    if (this.clickLock.isLocked('createUserAccount')) return;
    this.clickLock.lock('createUserAccount');
    this.loading = true;

    const userPayload = {
      userId: 0, // will be set by the server
      username: this.saccoForm.value.email,
      email: this.saccoForm.value.email,
      password: this.saccoForm.value.password,
      roleId: 2, // SACCO role
      isActive: true, // default to active
    };

    this.adminService.createUser(userPayload).subscribe({
      next: (user) => {
        this.createdUserId =this.authStore.user()?.id || user.userId;
        this.saccoForm.patchValue({ userId: user.userId });
        this.enableSaccoFields();
        this.userCreated = true;
        this.loading = false;
        this.clickLock.unlock('createUserAccount');
        alert('User account created. Now fill SACCO details.');
      },
      error: () => {
        this.loading = false;
        this.clickLock.unlock('createUserAccount');
      }
    });
  }

  enableSaccoFields() {
    this.saccoForm.get('phone')?.enable();
    this.saccoForm.get('address')?.enable();
    this.saccoForm.get('facilitatorId')?.enable();
  }

  createSacco() {
    if (this.clickLock.isLocked('createSacco')) return;
    this.clickLock.lock('createSacco');
    this.loading = true;

    const payload = { ...this.saccoForm.value, userId: this.createdUserId };

    this.adminService.createSacco(payload).subscribe({
      next: () => {
        this.loading = false;
        this.clickLock.unlock('createSacco');
        alert('SACCO created successfully!');
        this.router.navigate(['/home/admin/sacco-list']);
      },
      error: () => {
        this.loading = false;
        this.clickLock.unlock('createSacco');
      }
    });
  }
}

