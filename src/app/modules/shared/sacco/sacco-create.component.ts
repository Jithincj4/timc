import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sacco-create',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sacco-create.component.html'
})
export class SaccoCreateComponent implements OnInit {
  saccoForm!: FormGroup;
  facilitators: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.saccoForm = this.fb.group({
      saccoName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      facilitatorId: ['', Validators.required]
    });

    // Fetch facilitators from backend
    this.adminService.getFacilitators().subscribe(data => {
      this.facilitators = data;
    });
  }

  createSacco() {
    if (this.saccoForm.invalid) return;

    this.loading = true;
    this.adminService.createSacco(this.saccoForm.value).subscribe({
      next: (newSacco) => {
        // Auto-link SACCO to facilitator
        this.adminService.linkSaccoToFacilitator(newSacco.id, this.saccoForm.value.facilitatorId)
          .subscribe({
            next: () => {
              this.loading = false;
              alert('SACCO created and linked successfully!');
              this.router.navigate(['/admin/sacco-list']);
            },
            error: () => this.loading = false
          });
      },
      error: () => this.loading = false
    });
  }
}
