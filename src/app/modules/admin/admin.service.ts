import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDto } from "src/app/core/models/user-dto.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserDto[]>(`${this.baseUrl}/Users`);
  }
   /** Get user by ID */
   getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  /** Create new user */
  createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/Users`, user);
  }
  createPatient(payload: any) {
    return this.http.post('/api/Patients', payload);
  }

  createFacilitator(payload: any) {
    return this.http.post('/api/Facilitators', payload);
  }

  createSacco(payload: any) {
    return this.http.post('/api/Saccos', payload);
  }

  getSaccos() {
    return this.http.get<any[]>('/api/Saccos');
  }

  /** Update user */
  updateUser(id: number, user: UserDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  /** Delete user */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
