export interface Sacco {
    agentId: number;
    userId?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    idType?: string;
    idNumber?: string;
    dateOfBirth?: string;         // ISO string, parse as needed
    gender?: string;
    createdBy?: number;
    createdAt?: string;           // ISO string
    agentName?: string;
    registrationNumber?: string;
    location?: string;
    contactPerson?: string;
    isRemoved?: boolean;
  }
  
  export interface CreateSaccoDto {
    userId?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    idType?: string;
    idNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    agentName?: string;
    registrationNumber?: string;
    location?: string;
    contactPerson?: string;
    createdBy?: number;
  }
  
  export interface UpdateSaccoDto {
    agentId: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    idType?: string;
    idNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    agentName?: string;
    registrationNumber?: string;
    location?: string;
    contactPerson?: string;
  }
  