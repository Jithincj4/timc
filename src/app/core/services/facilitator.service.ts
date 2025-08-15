import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateFacilitatorRequest, UpdateFacilitatorDto, Specialization, FacilitatorDetails } from 'src/app/core/models/facilitator.model';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { SPECIALIZATION_DATA } from 'src/app/core/constants/master-data';
import { BaseApiService, ApiSignals } from 'src/app/core/services/base-api.service';

@Injectable({ providedIn: 'root' })
export class FacilitatorService extends BaseApiService<FacilitatorDetails> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/facilitators`);
  }
  updateFacilitator(dto: UpdateFacilitatorDto): ApiSignals<FacilitatorDetails> {
    return this.update<UpdateFacilitatorDto, FacilitatorDetails>(dto.facilitatorId, dto);
  }
  // ---- Lookup data ----
  getSpecializations(): Observable<Specialization[]> {
    return of(SPECIALIZATION_DATA).pipe(
      delay(500),
      map(specs =>
        specs.map(spec => ({
          ...spec,
          displayName: `${spec.specializationName} (${spec.categoryName})`,
        }))
      )
    );
  }
}
