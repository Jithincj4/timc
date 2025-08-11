import { User } from "src/app/modules/uikit/pages/table/model/user.model";

export interface FacilitatorDetails {
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
    userDto: User;
  }