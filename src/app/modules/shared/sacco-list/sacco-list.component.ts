import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sacco-list',
  imports: [CommonModule],
  templateUrl: './sacco-list.component.html'
})
export class SaccoListComponent implements OnInit {
  saccos: any[] = [];
  loading = false;

  constructor(
    private adminService: AdminService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadSaccos();
  }

  loadSaccos() {
    this.loading = true;
    this.adminService.getSaccos().subscribe({
      next: (data) => {
        this.saccos = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  editSacco(id: string) {
    this.router.navigate(['/admin/sacco-edit', id]);
  }

  deleteSacco(id: string) {
    if (!confirm('Are you sure you want to delete this SACCO?')) return;
    this.adminService.deleteSacco(id).subscribe({
      next: () => {
        this.saccos = this.saccos.filter(s => s.id !== id);
      }
    });
  }
}
