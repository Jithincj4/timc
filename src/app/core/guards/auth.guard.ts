// core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../state/auth.store.service';

export const authGuard: CanActivateFn = () => {
  // const auth = inject(AuthStore);
  // const router = inject(Router);

  // if (!auth.isLoggedIn()) {
  //   //router.navigate(['/sign-in']);
  //   return false;
  // }

  return true;
};
