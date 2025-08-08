import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { FormsModule } from '@angular/forms';
import { ClickLockService } from 'src/app/core/services/click-lock.service';
import { DisableAfterClickDirective } from 'src/app/core/directive/disable-after-click.directive';

@Component({
  selector: 'app-link-sacco-facilitator',
  imports: [FormsModule,DisableAfterClickDirective],
  templateUrl: './link-sacco-facilitator.component.html'
})
export class LinkSaccoFacilitatorComponent implements OnInit {
  saccos: any[] = [];
  facilitators: any[] = [];
  selectedSaccoId = '';
  selectedFacilitatorId = '';
  loading = false;

  constructor(  public clickLock: ClickLockService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSaccos();
    this.loadFacilitators();
  }

  loadSaccos() {
    this.adminService.getSaccos().subscribe(data => this.saccos = data);
  }

  loadFacilitators() {
    this.adminService.getFacilitators().subscribe(data => this.facilitators = data);
  }

  linkSacco() {
    if (this.clickLock.isLocked('createFacilitator')) return;

   


    if (!this.selectedSaccoId || !this.selectedFacilitatorId) {
      alert('Please select both SACCO and Facilitator.');
     
      return;
    }
    this.clickLock.lock('createFacilitator');

    this.loading = true;
    this.adminService.linkSaccoToFacilitator(this.selectedSaccoId, this.selectedFacilitatorId).subscribe({
      next: () => {
        this.loading = false;
        this.clickLock.unlock('createFacilitator');
        alert('SACCO linked to facilitator successfully!');
      },
      error: () => {
        this.loading = false;
        this.clickLock.unlock('createFacilitator');
        alert('Error linking SACCO.');
      }
    });
  }
}
