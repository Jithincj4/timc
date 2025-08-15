import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { signal, Signal } from '@angular/core';

export interface ApiSignals<T> {
  data: Signal<T | null>;
  loading: Signal<boolean>;
  success: Signal<boolean>;
  failure: Signal<boolean>;
  error: Signal<string | null>;
  result$: Observable<T | null>;
}

export abstract class BaseApiService<T> {
  constructor(protected http: HttpClient, protected baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  protected handleRequest<R>(obs$: Observable<R>): ApiSignals<R> {
    const data = signal<R | null>(null);
    const loading = signal(true);
    const success = signal(false);
    const failure = signal(false);
    const error = signal<string | null>(null);

    // 🔑 Auto-subscribe so HTTP call fires immediately
    obs$.pipe(
      tap(res => {
        data.set(res);
        success.set(true);
      }),
      catchError(err => {
        error.set(err?.message || 'Unknown error');
        failure.set(true);
        return of(null as R);
      }),
      finalize(() => loading.set(false))
    ).subscribe();

    return { data, loading, success, failure, error, result$: obs$ };
  }

  /** GET all items (optional endpoint & query params) */
  getAll<R = T>(endpoint: string = '', params?: HttpParams): ApiSignals<R[]> {
    const url = `${this.baseUrl}${endpoint ? `/${endpoint}` : ''}`;
    return this.handleRequest<R[]>(this.http.get<R[]>(url, { params }));
  }

  /** GET single item by ID */
  getOne<R = T>(id: string | number, endpoint: string = ''): ApiSignals<R> {
    const url = `${this.baseUrl}${endpoint ? `/${endpoint}` : ''}/${id}`;
    return this.handleRequest<R>(this.http.get<R>(url));
  }

  /** POST / create with separate request & response types */
  create<Req, Res = T>(body: Req, endpoint: string = ''): ApiSignals<Res> {
    const url = `${this.baseUrl}${endpoint ? `/${endpoint}` : ''}`;
    return this.handleRequest<Res>(this.http.post<Res>(url, body));
  }

  /** PUT / update with separate request & response types */
  update<Req, Res = T>(id: string | number, body: Req, endpoint: string = ''): ApiSignals<Res> {
    const url = `${this.baseUrl}${endpoint ? `/${endpoint}` : ''}/${id}`;
    return this.handleRequest<Res>(this.http.put<Res>(url, body));
  }

  /** DELETE item by ID */
  delete<Res = T>(id: string | number, endpoint: string = ''): ApiSignals<Res> {
    const url = `${this.baseUrl}${endpoint ? `/${endpoint}` : ''}/${id}`;
    return this.handleRequest<Res>(this.http.delete<Res>(url));
  }

  /** GET with custom query parameters */
  getWithParams<R = T>(endpoint: string, params: HttpParams): ApiSignals<R> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.handleRequest<R>(this.http.get<R>(url, { params }));
  }
}
