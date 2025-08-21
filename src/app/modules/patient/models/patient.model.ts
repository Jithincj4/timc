export interface PatientDto {
  personalInfo?: PersonalInfo;
  contactInfo?: ContactInfo;
  medicalInfo?: MedicalInfo;
  travelInfo?: TravelInfo;
  financialSponsorInfo?: FinancialSponsorInfo;
  saccoInfo?: SaccoInfo;
  consentInfo?: ConsentInfo;
}

export interface PersonalInfo {
  fullName: string;
  genderId: number;
  dateOfBirth: Date | string;
  age: number;
  nationalityId: number;
  passportNumber: string;
  passportIssueDate: Date | string;  // Added since it's now in form
  passportExpiryDate: Date | string;
  identificationTypeId: number;
  maritalStatusId: number;
  idOrPassportFilePath: string;
}

export interface ContactInfo {
  countryId: number;
  city: string;
  phoneNumber: string;               // Changed to string so it can hold +254 format
  alternatePhone?: string;
  emailAddress: string;
  whatsAppNumber?: string;
}

export interface MedicalInfo {
  primaryDiagnosis: string;
  symptomDescription: string;
  illnessDuration: string;
  medicalReports: string;             // File path or base64
  prescriptions?: string;             // Optional file path
  preferredSpecialty?: number[];      // Multi-select
  currentMedications?: string;
  knownAllergies?: string;
}

export interface TravelInfo {
  intendedTravelDate: string | null;
  PreferredCityId: number;
  visaAssistanceNeeded: boolean;
  medicalAttendantComing: boolean;
  passportScanPatient: string;        // File path
  passportScanAttendant?: string;     // Optional file path
}

export interface FinancialSponsorInfo {
  isSelfFunded: boolean;
  sponsorName?: string;
  sponsorContactNumber?: string;
  hasInsuranceCoverage: boolean;
  insuranceDocuments?: string;        // Optional file path
}

export interface SaccoInfo {
  associatedSacco?: string | number;  // ID or name
  memberId?: string;
}

export interface ConsentInfo {
  isDeclarationTrue: boolean;
  isConsentToShareData: boolean;
  digitalSignature: string;
  dateOfSubmission: string | null;
}
