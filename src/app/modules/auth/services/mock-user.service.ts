import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  userType: number; // 0 for Patient
}

interface PatientDetails {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  identificationType: string;
  passportNumber: string;
  passportExpiryDate: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  private users: User[] = [];
  private patientDetails: PatientDetails[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUser(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  addPatientDetails(details: PatientDetails): void {
    this.patientDetails.push(details);
  }

  getPatientDetails(email: string): PatientDetails | undefined {
    return this.patientDetails.find((details) => details.email === email);
  }
}