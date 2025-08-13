import { UserDto } from "./user-dto.model";

export interface FacilitatorDetails {
    licenseNumber: any;
    organisationName: any;
    createdBy: any;
    yearsOfExperience: any;
    specializations: any;
    firstName: string;
    lastName: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    userId?: number;
    idType?: string;
    idNumber?: string;
    dateOfBirth?: Date;
    gender?: string;
    languageIds: number[];
    specializationIds: number[];
  }
  
  export interface Language {
    languageId: number;
    languageName: string;
  }
  
  export interface Specialization {
    specializationId: number;
    specializationName: string;
    categoryId: number;
    categoryName: string;
  }

  export interface CreateFacilitatorRequest {
    facilitatorDto: FacilitatorDetails;
    userDto: UserDto;
  }
  export interface UpdateFacilitatorDto {
    facilitatorId: number;
    firstName: string;
    lastName: string;
    licenseNumber?: string;
    organisationName?: string;
    yearsOfExperience?: number;
    specializationIds: number[];
  }