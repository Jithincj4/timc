// upload.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadService {
   private baseUrl = `${environment.apiUrl}/Upload`; 
  constructor(private http: HttpClient) {}

 uploadFile(file: File, folder: string): Observable<{ path: string }> {
  const formData = new FormData();
  formData.append('File', file);      // must match property name in FileUploadDto
  formData.append('Folder', folder);  // must match property name in FileUploadDto

  return this.http.post<{ path: string }>(
    `${this.baseUrl}/upload`,
    formData
  );
}

}
