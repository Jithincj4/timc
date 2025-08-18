import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseApiService, ApiSignals } from 'src/app/core/services/base-api.service';
import { ServiceDto, CreateServiceDto, UpdateServiceDto, ServiceCategory } from '../models/service.model';

@Injectable({ providedIn: 'root' })
export class AppService extends BaseApiService<ServiceDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/services`);
  }

  // ---- CRUD ----
  createService(dto: CreateServiceDto): ApiSignals<ServiceDto> {
    return this.create<CreateServiceDto, ServiceDto>(dto);
  }

  updateService(dto: UpdateServiceDto): ApiSignals<ServiceDto> {
    return this.update<UpdateServiceDto, ServiceDto>(dto.id, dto);
  }

  deleteService(id: number): ApiSignals<void> {
    return this.delete(id);
  }

  getServiceById(id: string): ApiSignals<ServiceDto> {
    return this.getOne<ServiceDto>(id);
  }

  getAllServices(): ApiSignals<ServiceDto[]> {
    return this.getAll<ServiceDto>();
  }

  // ---- Categories ----
  getCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${environment.apiUrl}/service-categories`);
  }
}
