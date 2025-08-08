import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilitator-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './facilitator-create.component.html',
})
export class FacilitatorCreateComponent implements OnInit {
  facilitatorForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facilitatorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      specialization: [''],
      notes: ['']
    });
  }

  createFacilitator() {
    if (this.facilitatorForm.invalid) return;

    this.loading = true;
    this.adminService.createFacilitator(this.facilitatorForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Facilitator created successfully!');
        this.router.navigate(['/admin/facilitator-list']);
      },
      error: () => {
        this.loading = false;
        alert('Error creating facilitator.');
      }
    });
  }
}
