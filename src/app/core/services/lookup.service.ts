import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private baseUrl = `${environment.apiUrl}/lookups`; 

  constructor(private http: HttpClient) {}

  getLookups(): Observable<any> {
    debugger;
  return this.http.get<any>(this.baseUrl);
}

}
