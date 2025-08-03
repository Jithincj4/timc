import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import { MockUserService } from './services/mock-user.service';

@NgModule({
  imports: [AuthRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [provideHttpClient(withInterceptorsFromDi()), MockUserService]
})
export class AuthModule {}
