
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentDashboardComponent } from './pages/dashboard/agent-dashboard.component';
import { MessageScreenComponent } from '../chat/chat-home/message-screen.componen';

const routes: Routes = [
  { path: '', component: AgentDashboardComponent },
   {path: 'chat', component:MessageScreenComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaccoRoutingModule {}
