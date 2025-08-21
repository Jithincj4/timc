import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, effect } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface User {
  email: string;
  name: string;
  token: string;
  role?: string;
  exp?: number; // JWT expiry timestamp (seconds)
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user() && !this.isTokenExpired());
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  private readonly baseUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {
    this.autoLogin();

    // Auto-logout when token expires
    effect(() => {
      const user = this._user();
      if (user?.exp) {
        const expiresInMs = user.exp * 1000 - Date.now();
        if (expiresInMs > 0) {
          setTimeout(() => this.logout(), expiresInMs);
        }
      }
    });
  }

  /** Decode JWT token safely */
  private decodeJwt(token: string): { email: string; role?: string; exp?: number } {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.sub, // "sub" holds the email
        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], // role claim
        exp: payload.exp
      };
    } catch (e) {
      console.error('Invalid JWT token', e);
      return { email: '' };
    }
  }

  /** Check if current token is expired */
  private isTokenExpired(): boolean {
    const user = this._user();
    if (!user?.exp) return false;
    return Date.now() >= user.exp * 1000;
  }

  /** Perform login and persist user/token */
  login(username: string, password: string): Promise<boolean> {
    this._loading.set(true);
    this._error.set(null);

    return new Promise((resolve) => {
      this.http.post<{ token: string; role?: string }>(`${this.baseUrl}/login`, { username, password })
        .subscribe({
          next: (res) => {
            console.log('Login response:', res);
            const decoded = this.decodeJwt(res.token);
            if (!decoded.email) {
              this._error.set('Invalid token received');
              this._loading.set(false);
              resolve(false);
              return;
            }

            const user: User = {
              email: decoded.email,
              name: decoded.email.split('@')[0], // fallback name from email
              token: res.token,
              role: decoded.role ?? res.role,
              exp: decoded.exp
            };

            this._user.set(user);
            localStorage.setItem('auth_user', JSON.stringify(user));

            this._loading.set(false);
            resolve(true);
          },
          error: (err) => {
            console.error('Login error:', err);
            this._user.set(null);
            this._error.set(err.error?.message || 'Login failed');
            this._loading.set(false);
            resolve(false);
          }
        });
    });
  }

  /** Logout user */
  logout(): void {
    this._user.set(null);
    this._error.set(null);
    localStorage.removeItem('auth_user');
  }

  /** Try restore user from localStorage */
  autoLogin(): void {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        const user: User = JSON.parse(stored);
        if (!this.isTokenExpired()) {
          this._user.set(user);
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }
}
