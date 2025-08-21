import { Component, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { SaccosService } from 'src/app/core/services/sacco.service';
import { Sacco } from 'src/app/core/models/sacco';

@Component({
  selector: 'app-sacco-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './sacco-list.component.html',
})
export class SaccoListComponent implements OnInit {
  // UI state
  saccos: Sacco[] = [];
  saccoSignals$ = this.saccoService.getAll();

  search = '';
  page = 1;
  pageSize = 6;

  loading = false;

  constructor(private saccoService: SaccosService, private alertService: AlertService, public router: Router) {
    effect(() => {
      this.loading = this.saccoSignals$.loading();
      if (this.saccoSignals$.success()) {
        this.saccos = this.saccoSignals$.data() || [];
      }
      if (this.saccoSignals$.failure()) {
        this.alertService.showError('Failed to load Saccos: ' + this.saccoSignals$.error());
      }
    });
  }

  ngOnInit(): void {
    this.loadSaccos();
  }

  get filteredSaccos() {
    const q = this.search?.trim().toLowerCase();
    if (!q) return this.saccos || [];
    return this.saccos!.filter(
      (s) =>
        (s.agentName || '').toLowerCase().includes(q) ||
        (s.phone || '').toLowerCase().includes(q) ||
        (s.location || '').toLowerCase().includes(q) ||
        (s.contactPerson || '').toLowerCase().includes(q),
    );
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredSaccos.length / this.pageSize));
  }
  get start() {
    return (this.page - 1) * this.pageSize;
  }
  get end() {
    return Math.min(this.start + this.pageSize, this.filteredSaccos.length);
  }
  get pagedSaccos() {
    return this.filteredSaccos.slice(this.start, this.start + this.pageSize);
  }

  loadSaccos() {}

  editSacco(sacco: Sacco) {
    this.router.navigate(['/admin/sacco-edit', sacco.agentId]);
  }

  deleteSacco(agentId: number) {
    if (!confirm('Are you sure you want to delete this SACCO?')) return;

    const api = this.saccoService.delete(agentId);

    // Set loading manually
    this.loading = true;

    // Subscribe to result$ to trigger API call
    api.result$.subscribe((res) => {
      this.loading = false;

      if (api.success()) {
        this.alertService.showSuccess('Sacco deleted successfully.');
        this.saccos = this.saccos.filter((s) => s.agentId !== agentId);
      } else if (api.failure()) {
        this.alertService.showError('Failed to delete Sacco: ' + api.error());
      }
    });
  }

  // Pagination & search actions
  clearSearch() {
    this.search = '';
    this.page = 1;
  }
  prevPage() {
    if (this.page > 1) this.page--;
  }
  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }
}
