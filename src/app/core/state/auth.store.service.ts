// core/state/auth.store.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface User {
  id: number;
  email: string;
  name: string;
  token: string; 
  role?: string; // Optional roles for role-based access control
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  private baseUrl = environment.apiUrl + '/Auth';
  constructor(private http: HttpClient) {}

  private decodeJwt(token: string): { userId: number; email: string; username: string } {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId,
      email: payload.email,
      username: payload.username
    };
  }
  login(username: string, password: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);
  
    return new Promise((resolve) => {
      this.http.post<{ token: string,role:string }>(`${this.baseUrl}/login`, { username, password })
        .subscribe({
          next: (res) => {
            const decoded = this.decodeJwt(res.token);
            this._user.set({
              id: decoded.userId,
              email: decoded.email,
              name: decoded.username,
              token: res.token,
              role: res.role
            });
            localStorage.setItem('token', res.token);
            this._loading.set(false);
            resolve(true);
          },
          error: (err) => {
            this._user.set(null);
            this._error.set(err.error?.message || 'Login failed');
            this._loading.set(false);
            resolve(false);
          }
        });
    });
  }
  logout() {
    this._user.set(null);
    this._error.set(null);
    localStorage.removeItem('token');
  }
  autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeJwt(token);
      this._user.set({
        id: decoded.userId,
        email: decoded.email,
        name: decoded.username,
        token
      });
    }
  }
}
