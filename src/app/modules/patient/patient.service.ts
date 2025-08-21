import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsentInfo, ContactInfo, FinancialSponsorInfo, MedicalInfo, PatientDto, PersonalInfo, SaccoInfo, TravelInfo } from './models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}
// Step 1: Save personal info (returns patient id)
  createPatientPersonalInfo(personalInfo?: PersonalInfo): Observable<{ patientId: number }> {
    return this.http.post<{ patientId: number }>(`${this.baseUrl}`, personalInfo);
  }

  // Step 2+: Update other info by patient id
  updateContactInfo(patientId: number, contactInfo?: ContactInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/contact-info`, contactInfo);
  }

  updateMedicalInfo(patientId: number, medicalInfo?: MedicalInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/medical-info`, medicalInfo);
  }

  updateTravelInfo(patientId: number, travelInfo?: TravelInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/travel-info`, travelInfo);
  }

  updateFinancialSponsorInfo(patientId: number, sponsorInfo?: FinancialSponsorInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/financial-sponsor-info`, sponsorInfo);
  }

  updateSaccoInfo(patientId: number, saccoInfo?: SaccoInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/sacco-info`, saccoInfo);
  }

  updateConsentInfo(patientId: number, consentInfo?: ConsentInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}/${patientId}/consent-info`, consentInfo);
  }
}

