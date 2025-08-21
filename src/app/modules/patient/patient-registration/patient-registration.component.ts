import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize, switchMap, catchError, map } from 'rxjs/operators';
import { NgSelectModule } from '@ng-select/ng-select';
import { forkJoin, Observable, of } from 'rxjs';
import { PatientService } from '../patient.service';
import { PatientDto } from '../models/patient.model';

import { AdminService } from '../../admin/admin.service';
import { LookupService } from 'src/app/core/services/lookup.service';
import { UploadService } from 'src/app/core/services/upload.service';
@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgSelectModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  genders: any[] = [];
  countries: any[] = [];
  nationalities: any[] = [];
  maritalStatus: any[] = [];
  identificationTypes: any[] = [];
  specialties: any[] = [];
  indianCities: any[] = [];
  saccos: any[] = [];


  currentStep = 1;
  patientForm!: FormGroup;
 submitted = false;  

  steps = [
    'Personal & Contact Information',
    'Medical & Travel Information',
    'Financial & SACCO Connection',
    'Consent & Declaration'
  ];

insuranceDocPath:string = "";
passportScanPatientPath: string = "";
passportScanAttendantPath: string = "";
medicalReportsPath: string = "";
prescriptionsPath:string="";
identificationFilePath:string = "";

  constructor(private uploadService: UploadService,private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private lookupService: LookupService
  ) {}

  ngOnInit() {
 
 
    this.patientForm = this.fb.group({
      // Step 1 - Personal Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: [{ value: '', disabled: true }, Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: [''],
      passportNumber: ['', Validators.required],
      passportIssueDate: ['', Validators.required],
      passportExpiryDate: ['', Validators.required],
      identificationType: ['', Validators.required],
      identificationFile: ['', Validators.required],

      // Contact Info
      countryOfResidence: ['', Validators.required],
      cityTown: ['', Validators.required],
       phoneNumber: ['', [Validators.required]],
      alternatePhone: ['', Validators.pattern(/^\+\d{1,4}\d{7,15}$/)],
    email: ['', [Validators.required, Validators.email]],
    whatsappNumber: [''],

      // Step 2 - Medical Info
      primaryDiagnosis: ['', Validators.required],
      symptomDescription: ['', Validators.required],
      illnessDuration: ['', Validators.required],
      medicalReports: ['', Validators.required],
      prescriptions: [null],
      preferredSpecialty: [[]],
      currentMedications: [''],
      knownAllergies: [''],

      // Travel & Visa Info
      intendedTravelDate: ['', Validators.required],
      preferredCityIndia: ['', Validators.required],
      visaAssistanceNeeded: [false, Validators.required],
      medicalAttendantComing: [false],
      passportScanPatient: [null, Validators.required],
      passportScanAttendant: [null],

      // Step 3 - Financial & SACCO
      selfFunded: ['', Validators.required],
      sponsorName: [''],
      sponsorContact: [''],
      insuranceCoverage: [false],
      insuranceDocuments: [null],
      associatedSacco: [''],
      memberId: [''],

      // Step 4 - Consent
      declarationTrue: [false, Validators.requiredTrue],
      consentToShare: [false, Validators.requiredTrue],
      digitalSignature: ['', Validators.required],
      dateOfSubmission: [{ value: new Date().toISOString().split('T')[0], disabled: true }]
    });

    this.lookupService.getLookups().subscribe((data: { genders: any[]; countries: any[]; nationalities: any[]; maritalStatus: any[]; identificationType: any[]; specialties: any[]; indianCities: any[]; }) => {
      this.genders = data.genders;
      this.countries = data.countries;
      this.nationalities = data.nationalities;
      this.maritalStatus = data.maritalStatus;
      this.identificationTypes = data.identificationType;
      this.specialties = data.specialties;
    this.indianCities=data.indianCities
    });
//   this.adminService.getAll<any>('saccos').subscribe({
//   next: (res) => {
//     if (res && Array.isArray(res)) {
//       this.saccos = res.map(s => ({
//         id: s.saccoId,
//         name: s.name
//       }));
//     }
//   },
  
//   error: (err) => console.error('Failed to load SACCOs', err)
// });



    this.setupDateOfBirthListener();
  }
onFileSelect(event: any, controlName: string) {
  const file = event.target.files[0];
  if (file) {
    const validTypes = ['image/jpeg', 'application/pdf', 'image/png', 'application/dicom'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB!');
      return;
    }
    this.patientForm.get(controlName)?.setValue(file);
  }
}

onFileSelected(event: any, folder: string, targetProp: keyof this) {
  const file: File = event.target.files[0];
  if (!file) return;

  this.uploadService.uploadFile(file, folder).subscribe({
    next: (response: { path: any; }) => {
      console.log(`${folder} file saved at:`, response.path);
      (this as any)[targetProp] = response.path; // assign to the correct property
    },
    error: (err: any) => {
      console.error(`File upload failed for ${folder}`, err);
    }
  });
}

isInvalid(controlName: string): boolean {
  const control = this.patientForm.get(controlName);
  return !!(control && control.invalid && (control.touched || control.dirty || this.submitted));
}


  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  private setupDateOfBirthListener(): void {
    this.patientForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
      if (value) {
        const age = this.calculateAge(value);
        this.patientForm.patchValue({ age: age }, { emitEvent: false });
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  goToStep(step: number) {
    this.currentStep = step;
  }
getInvalidControls(): string[] {
  const invalidControls: string[] = [];
  const controls = this.patientForm.controls;

  for (const name in controls) {
    if (controls[name].invalid) {
      invalidControls.push(name);
    }
  }

  return invalidControls;
}

  async onSubmit() {

    this.submitted = true;
if (this.patientForm.invalid) {
    const invalidControls = this.getInvalidControls();
    // Scroll to the first invalid field for better UX
    const firstInvalid = document.querySelector('.ng-invalid');
    if (firstInvalid) {
      (firstInvalid as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

    const form = this.patientForm.getRawValue();
    const patientDto: PatientDto = {
      personalInfo: {
        fullName: `${form.firstName} ${form.lastName}`,
        genderId: Number(form.gender),
        dateOfBirth: form.dateOfBirth,
        age: this.calculateAge(form.dateOfBirth),
        nationalityId: Number(form.nationality),
        passportNumber: form.passportNumber,
        passportExpiryDate: form.passportExpiryDate,
        passportIssueDate: form.passportIssueDate,
        identificationTypeId: Number(form.identificationType),
        maritalStatusId: Number(form.maritalStatus),
        idOrPassportFilePath: this.identificationFilePath
      },
      contactInfo: {
        countryId: Number(form.countryOfResidence),
        city: form.cityTown,
        phoneNumber: form.phoneNumber,
        alternatePhone: form.alternatePhone,
        emailAddress: form.email,
        whatsAppNumber: form.whatsappNumber
      },
      medicalInfo: {
        primaryDiagnosis: form.primaryDiagnosis,
        symptomDescription: form.symptomDescription,
        illnessDuration: form.illnessDuration,
        medicalReports: this.medicalReportsPath,
        prescriptions: this.prescriptionsPath,
        preferredSpecialty: form.preferredSpecialty,
        currentMedications: form.currentMedications,
        knownAllergies: form.knownAllergies
      },
      travelInfo: {
        intendedTravelDate: form.intendedTravelDate,
        PreferredCityId: form.preferredCityIndia,
        visaAssistanceNeeded: form.visaAssistanceNeeded,
        medicalAttendantComing: form.medicalAttendantComing,
        passportScanPatient:this.passportScanPatientPath,
        passportScanAttendant:this.passportScanAttendantPath
      },
      financialSponsorInfo: {
        isSelfFunded: form.selfFunded === 'Yes',
        sponsorName: form.sponsorName,
        sponsorContactNumber: form.sponsorContact,
        hasInsuranceCoverage: form.insuranceCoverage,
        insuranceDocuments:this.insuranceDocPath
      },
      saccoInfo: {
        associatedSacco: form.associatedSacco,
        memberId: form.memberId
      },
      consentInfo: {
        isDeclarationTrue: form.declarationTrue,
        isConsentToShareData: form.consentToShare,
        digitalSignature: form.digitalSignature,
        dateOfSubmission: form.dateOfSubmission
      }
    };

    this.patientService.createPatientPersonalInfo(patientDto.personalInfo).pipe(
      switchMap(res => {
        const patientId = res.patientId;
        const wrap = (obs: Observable<any>) =>
          obs.pipe(catchError(err => of({ success: false, error: err })));

        return forkJoin({
          contact: wrap(this.patientService.updateContactInfo(patientId, patientDto.contactInfo)),
          medical: wrap(this.patientService.updateMedicalInfo(patientId, patientDto.medicalInfo)),
          travel: wrap(this.patientService.updateTravelInfo(patientId, patientDto.travelInfo)),
          financial: wrap(this.patientService.updateFinancialSponsorInfo(patientId, patientDto.financialSponsorInfo)),
          sacco: wrap(this.patientService.updateSaccoInfo(patientId, patientDto.saccoInfo)),
          consent: wrap(this.patientService.updateConsentInfo(patientId, patientDto.consentInfo))
        }).pipe(map(results => ({ patientId, results })));
      }),
      finalize(() => this. submitted  = false)
    ).subscribe({
      next: ({ patientId, results }) => {
        const failedSections = Object.entries(results)
          .filter(([_, res]) => (res as any).success === false)
          .map(([key]) => key);

        if (failedSections.length) {
          alert(`Patient created (ID: ${patientId}) but failed to save: ${failedSections.join(', ')}`);
        } else {
          alert(`Patient created and all info saved successfully (ID: ${patientId})`);
          this.router.navigate(['/patients']);
        }
      },
      error: (err) => {
        alert(`Failed to create patient: ${err.message || err}`);
      }
    });
  }
  autoPopulatePhoneCode() {
  const selectedCountryId = Number(this.patientForm.get('countryOfResidence')?.value);
     if (selectedCountryId) {
    const country = this.countries.find(c => c.CountryId === selectedCountryId);
    if (country && country.PhoneCode) {
      const prefix = `${country.PhoneCode} `; 
      this.patientForm.patchValue({ phoneNumber: prefix });
  }
}
  }
}


