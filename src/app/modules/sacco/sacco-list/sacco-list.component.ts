import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaccosService } from '../sacco.service';

@Component({
  selector: 'app-sacco-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './sacco-list.component.html'
})
export class SaccoListComponent implements OnInit {
  saccos: any[] = [];
  loading = false;
    // UI state
    search = '';
    page = 1;
    pageSize = 6;

  constructor(
    private saccoService: SaccosService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadSaccos();
  }
  get filteredSaccos() {
    const q = this.search?.trim().toLowerCase();
    if (!q) return this.saccos;
    return this.saccos.filter(s =>
      (s.agentName || '').toLowerCase().includes(q)
      || (s.phone || '').toLowerCase().includes(q)
      || (s.location || '').toLowerCase().includes(q)
      || (s.contactPerson || '').toLowerCase().includes(q)
    );
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredSaccos.length / this.pageSize));
  }
  get start() { return (this.page - 1) * this.pageSize; }
  get end() { return Math.min(this.start + this.pageSize, this.filteredSaccos.length); }
  get pagedSaccos() { return this.filteredSaccos.slice(this.start, this.start + this.pageSize); }

  loadSaccos() {
    this.loading = true;
    this.saccoService.getAll().subscribe({
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

  deleteSacco(id: number) {
    if (!confirm('Are you sure you want to delete this SACCO?')) return;
    this.saccoService.delete(id).subscribe({
      next: () => {
        this.saccos = this.saccos.filter(s => s.id !== id);
      }
    });
  }
  // Actions
  clearSearch(){ this.search = ''; this.page = 1; }
  prevPage(){ if(this.page>1) this.page--; }
  nextPage(){ if(this.page < this.totalPages) this.page++; }
}
