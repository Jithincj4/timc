// src/app/services/facilitator.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreateFacilitatorRequest, FacilitatorDetails, Language, Specialization } from 'src/app/core/models/facilitator.model';
import { UserDto } from 'src/app/core/models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FacilitatorService {
    [x: string]: any;
      MOCK_LANGUAGES = [
        { languageId: 1, languageName: 'English' },
        { languageId: 2, languageName: 'Swahili' },
        { languageId: 3, languageName: 'French' }
      ];
      
        MOCK_SPECIALIZATIONS = [
        { specializationId: 1, specializationName: 'Medical Agent', categoryId: 4, categoryName: 'Medical Agent' },
        { specializationId: 2, specializationName: 'Travel Agent', categoryId: 2, categoryName: 'Travel Agent' },
        { specializationId: 3, specializationName: 'Booking Agent', categoryId: 1, categoryName: 'Booking Agent' },
        { specializationId: 4, specializationName: 'Insurance Agent', categoryId: 3, categoryName: 'Insurance Agent' },
        { specializationId: 5, specializationName: 'Medical Tourism', categoryId: 5, categoryName: 'Medical Tourism' },
        { specializationId: 6, specializationName: 'Healthcare Consultant', categoryId: 4, categoryName: 'Medical Agent' }
      ];
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createUser(user: UserDto): Observable<any> {
    user.roleId = 3; // Assuming roleId 3 is for Facilitator
    return this.http.post(`${this.apiUrl}/users`, user);
  }
  createFacilitator(dto: CreateFacilitatorRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/facilitators`, dto);
  }
// In FacilitatorMockService
getLanguages(): Observable<Language[]> {
    return new Observable(observer => {
      this['delay']().subscribe(() => {
        // Simulate occasional errors (20% chance)
        if (Math.random() < 0.2) {
          observer.error(new Error('Failed to load languages'));
        } else {
          observer.next([...this.MOCK_LANGUAGES]);
          observer.complete();
        }
      });
    });
  }

  getSpecializations(): Observable<Specialization[]> {
    return new Observable(observer => {
      this['delay']().subscribe(() => {
        // Simulate API transformation
        const transformedData = this.MOCK_SPECIALIZATIONS.map(spec => ({
          ...spec,
          displayName: `${spec.specializationName} (${spec.categoryName})`
        }));
        
        observer.next(transformedData);
        observer.complete();
      });
    });
  }
}