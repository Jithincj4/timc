import { Component, effect, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { c } from 'node_modules/@angular/material/dialog.d-hlN3f-Hk';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaccosService } from 'src/app/core/services/sacco.service';
import { FacilitatorService } from 'src/app/core/services/facilitator.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-link-sacco-facilitator',
  imports: [CommonModule, FormsModule],
  templateUrl: './link-sacco-facilitator.component.html',
})
export class LinkSaccoFacilitatorComponent implements OnInit {
  saccosObj: any;
  facilitatorsObj: any;
  selectedSaccoId = '';
  selectedFacilitatorId = '';
  loading = false;

  constructor(
    private adminService: AdminService, 
    private alertService: AlertService,
    private saccoService: SaccosService,
    private facilitatorService:FacilitatorService) {}

  ngOnInit(): void {
    this.saccosObj = this.saccoService.getAll();
    this.facilitatorsObj = this.facilitatorService.getAll();
  }

  linkSacco() {
    if (!this.selectedSaccoId || !this.selectedFacilitatorId) {
      this.alertService.showWarning('Please select both SACCO and Facilitator.');
      return;
    }
    const apiResponse= this.adminService.linkSaccoToFacilitator(this.selectedSaccoId, this.selectedFacilitatorId)

    effect(() => {
      this.loading = apiResponse.loading();
      if (apiResponse.success()) {
        this.alertService.showSuccess('SACCO linked to Facilitator successfully.');
        this.selectedSaccoId = '';
        this.selectedFacilitatorId = '';
      } else if (apiResponse.failure()) {
        this.alertService.showError('Failed to link SACCO to Facilitator.');
      } else if (apiResponse.error()) {
        this.alertService.showError(apiResponse.error()!);
      } 
    });  
  }
}
