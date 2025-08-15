import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { SaccoCreateComponent } from '../sacco/sacco/sacco-create.component';
import { SaccoListComponent } from '../sacco/sacco-list/sacco-list.component';
import { FacilitatorCreateComponent } from '../facilitator/facilitator/facilitator-create.component';
import { FacilitatorListComponent } from '../facilitator/facilitator-list/facilitator-list.component';
import { LinkSaccoFacilitatorComponent } from './pages/link-sacco-facilitator/link-sacco-facilitator.component';
import { FacilitatorEditComponent } from '../facilitator/facilitator-edit/facilitator-edit.component';
import { ServiceCreateFormComponent } from '../services/create/service-create.component';
import { ManageServicesComponent } from '../services/manage/manage-services.component';
import { EditServiceComponent } from '../services/edit/edit-service.component';
import { MessageScreenComponent } from '../chat/chat-home/message-screen.componen';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'sacco-create', component: SaccoCreateComponent },
  { path: 'sacco-list', component: SaccoListComponent },
  { path: 'facilitator-create', component: FacilitatorCreateComponent },
  { path: 'facilitator-edit/:facilitatorId', component: FacilitatorEditComponent },
  { path: 'facilitator-list', component: FacilitatorListComponent },
  { path: 'link-sacco-facilitator', component: LinkSaccoFacilitatorComponent },
  { path: 'service-management', component: ManageServicesComponent },
  { path: 'service-create', component: ServiceCreateFormComponent },
  { path: 'services/:id/edit', component: EditServiceComponent },
  {path: 'chat', component:MessageScreenComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
