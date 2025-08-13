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
   getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/users/${id}`);
  }

  /** Create new user */
  createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/Users`, user);
  }
  createPatient(payload: any) {
    return this.http.post('/Patients', payload);
  }

  createFacilitator(payload: any) {
    return this.http.post(`${this.baseUrl}/Facilitators`, payload);
  }
  createSacco(saccoData: any) {
    return this.http.post<any>(`${this.baseUrl}/saccos`, saccoData);
  }

  getSaccos() {
    return this.http.get<any[]>(`${this.baseUrl}/Saccos`);
  }
  deleteSacco(id: string) {
    return this.http.delete(`${this.baseUrl}/saccos/${id}`);
  }
  /** Update user */
  updateUser(id: string, user: UserDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  /** Delete user */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getFacilitators() {
    return this.http.get<any[]>(`${this.baseUrl}/facilitators`);
  }
  deleteFacilitator(id: string) {
  return this.http.delete(`${this.baseUrl}/facilitators/${id}`);
}

  getPatientsByFacilitator(facilitatorId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/facilitators/${facilitatorId}/patients`);
  }

  linkSaccoToFacilitator(saccoId: string, facilitatorId: string) {
    return this.http.post(`${this.baseUrl}/link-sacco`, { saccoId, facilitatorId });
  }
}
