import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { SaccoCreateComponent } from '../shared/sacco/sacco-create.component';
import { SaccoListComponent } from '../shared/sacco-list/sacco-list.component';
import { FacilitatorCreateComponent } from '../shared/facilitator/facilitator-create.component';
import { FacilitatorListComponent } from '../shared/facilitator-list/facilitator-list.component';
import { PatientByFacilitatorComponent } from '../shared/patients-list/patient-by-facilitator.component';
import { LinkSaccoFacilitatorComponent } from './pages/link-sacco-facilitator/link-sacco-facilitator.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'sacco-create', component: SaccoCreateComponent },
  { path: 'sacco-list', component: SaccoListComponent },
  { path: 'facilitator-create', component: FacilitatorCreateComponent },
  { path: 'facilitator-list', component: FacilitatorListComponent },
  { path: 'patient-by-facilitator', component: PatientByFacilitatorComponent },
  { path: 'link-sacco-facilitator', component: LinkSaccoFacilitatorComponent },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
