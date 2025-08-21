import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../state/auth.store.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
 const _auth = inject(AuthStore);
  const token = _auth.user()?.token || localStorage.getItem('token');

  const clonedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Clear token/session
        localStorage.removeItem('token');

        // Optional: redirect to login
        router.navigate(['/sign-in']);

        // Optional: show toast or log
        console.warn('Unauthorized - logging out...');
      }
      return throwError(() => err);
    })
  );
};
