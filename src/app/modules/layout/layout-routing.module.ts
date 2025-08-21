import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { AuthStore } from 'src/app/core/state/auth.store.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const auth = inject(AuthStore);
      const role = auth.user()?.role;

      switch (role) {
        case 'Admin':
          return 'admin';
        case 'patient':
          return 'patient';
        case 'facilitator':
          return 'facilitator';
        case 'SACCO':
          return 'agent';
        default:
          return '/unauthorized';
      }
    },
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: LayoutComponent,
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'agent',
    canActivate: [authGuard],
    component: LayoutComponent,
    loadChildren: () => import('../sacco/sacco.module').then((m) => m.SaccoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
