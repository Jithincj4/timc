import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sacco, CreateSaccoDto, UpdateSaccoDto } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class SaccosService {
  private readonly apiUrl = 'https://localhost:7177/api/Saccos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sacco[]> {
    return this.http.get<Sacco[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(agentId: number): Observable<Sacco> {
    return this.http.get<Sacco>(`${this.apiUrl}/${agentId}`)
      .pipe(catchError(this.handleError));
  }

  create(dto: CreateSaccoDto): Observable<Sacco> {
    return this.http.post<Sacco>(this.apiUrl, dto)
      .pipe(catchError(this.handleError));
  }

  update(dto: UpdateSaccoDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${dto.agentId}`, dto)
      .pipe(catchError(this.handleError));
  }

  delete(agentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${agentId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('SaccosService error', error);
    // Optionally display an error message to user via toast/snackbar
    return throwError(() => error);
  }
}
