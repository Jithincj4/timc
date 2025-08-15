import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApiService, ApiSignals } from "src/app/core/services/base-api.service";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class AdminService extends BaseApiService<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}`);
  }

  linkSaccoToFacilitator(saccoId: string, facilitatorId: string): ApiSignals<any> {
    return this.handleRequest<any>(
      this.http.post<any>(`${this.baseUrl}/link-sacco`, { saccoId, facilitatorId })
    );
  }
}
