import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApiService, ApiSignals } from 'src/app/core/services/base-api.service';
import { Sacco, CreateSaccoDto, UpdateSaccoDto } from 'src/app/core/models/sacco';

@Injectable({ providedIn: 'root' })
export class SaccosService extends BaseApiService<Sacco> {
  constructor(http: HttpClient) {
    super(http, 'https://localhost:7177/api/Saccos');
  }

}
