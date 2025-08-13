// src/app/services/facilitator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  CreateFacilitatorRequest,
  Language,
  Specialization,
  UpdateFacilitatorDto,
} from 'src/app/core/models/facilitator.model';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { SPECIALIZATION_DATA } from 'src/app/core/constants/master-data';

@Injectable({
  providedIn: 'root',
})
export class FacilitatorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** Create a new user with Facilitator role */
  createUser(user: UserDto): Observable<any> {
    const FACILITATOR_ROLE_ID = 3;
    return this.http.post(`${this.apiUrl}/users`, {
      ...user,
      roleId: FACILITATOR_ROLE_ID,
    });
  }

  /** Create facilitator profile */
  createFacilitator(dto: CreateFacilitatorRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/facilitators`, dto);
  }

  /** Get facilitator by ID */
  getFacilitatorById(facilitatorId: string): Observable<any> { 
    return this.http.get(`${this.apiUrl}/facilitators/${facilitatorId}`);
  }
  /** Update facilitator profile */
  updateFacilitator(dto: UpdateFacilitatorDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/facilitators`, dto);
  }
  /** Mock specializations API with simulated delay */getSpecializations(): Observable<Specialization[]> {
  return of(SPECIALIZATION_DATA).pipe(
    delay(500),
    map((specs) =>
      specs.map((spec) => ({
        ...spec,
        displayName: `${spec.specializationName} (${spec.categoryName})`,
      }))
    )
  );
}
}
