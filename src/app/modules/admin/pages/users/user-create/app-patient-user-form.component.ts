import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-user-form',
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="submit()" class="bg-card space-y-6 rounded-xl border border-white/10 p-6 shadow-md">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium ">Username</label>
        <input
          type="text"
          [(ngModel)]="model.username"
          name="username"
          placeholder="Enter username"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium ">Email</label>
        <input
          type="email"
          [(ngModel)]="model.email"
          name="email"
          placeholder="Enter email"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium ">Password</label>
        <input
          type="password"
          [(ngModel)]="model.password"
          name="password"
          placeholder="Enter password"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>
        <div>
          <label class="text-sm ">Full Name</label>
          <input
            type="text"
            [(ngModel)]="model.fullName"
            name="fullName"
            class="input"
            placeholder="Full Name"
            required />
        </div>

        <div>
          <label class="text-sm ">Date of Birth</label>
          <input type="date" [(ngModel)]="model.dateOfBirth" name="dateOfBirth" class="input" required />
        </div>

        <div>
          <label class="text-sm ">Gender</label>
          <input type="text" [(ngModel)]="model.gender" name="gender" class="input" placeholder="Gender" required />
        </div>

        <div>
          <label class="text-sm ">Nationality</label>
          <input
            type="text"
            [(ngModel)]="model.nationality"
            name="nationality"
            class="input"
            placeholder="Nationality"
            required />
        </div>

        <div>
          <label class="text-sm ">Passport Number</label>
          <input
            type="text"
            [(ngModel)]="model.passportNumber"
            name="passportNumber"
            class="input"
            placeholder="Passport Number"
            required />
        </div>

        <div>
          <label class="text-sm ">Passport Expiry Date</label>
          <input type="date" [(ngModel)]="model.passportExpiryDate" name="passportExpiryDate" class="input" required />
        </div>

        <div>
          <label class="text-sm ">Email</label>
          <input type="email" [(ngModel)]="model.email" name="email" class="input" placeholder="Email" />
        </div>

        <div>
          <label class="text-sm ">Phone</label>
          <input type="tel" [(ngModel)]="model.phone" name="phone" class="input" placeholder="Phone" />
        </div>

        <div>
          <label class="text-sm ">Travel Date</label>
          <input type="date" [(ngModel)]="model.travelDate" name="travelDate" class="input" required />
        </div>

        <div>
          <label class="text-sm ">Preferred City</label>
          <input
            type="text"
            [(ngModel)]="model.preferredCity"
            name="preferredCity"
            class="input"
            placeholder="Preferred City" />
        </div>

        <div class="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            [(ngModel)]="model.visaRequired"
            name="visaRequired"
            id="visaRequired"
            class="accent-primary" />
          <label for="visaRequired" class="text-sm ">Visa Required</label>
        </div>

        <div class="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            [(ngModel)]="model.isSelfFunded"
            name="isSelfFunded"
            id="isSelfFunded"
            class="accent-primary" />
          <label for="isSelfFunded" class="text-sm ">Self Funded</label>
        </div>

        <div class="md:col-span-2">
          <label class="text-sm ">Sponsor Name</label>
          <input
            type="text"
            [(ngModel)]="model.sponsorName"
            name="sponsorName"
            class="input"
            placeholder="Sponsor Name" />
        </div>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="btn text-white btn-primary bg-primary w-full rounded-lg py-2 px-4 font-semibold  transition hover:bg-opacity-90">
          Create Patient
        </button>
      </div>
    </form>
  `,
})
export class PatientUserFormComponent {
  model: any = {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    passportNumber: '',
    passportExpiryDate: '',
    email: '',
    phone: '',
    travelDate: '',
    preferredCity: '',
    visaRequired: false,
    isSelfFunded: false,
    sponsorName: '',
    username: '',
    password: '',
    roleId: 4,
  };

  constructor(private userService: AdminService) {}

  submit() {
    this.userService.createPatient(this.model).subscribe(() => {
      alert('Patient created successfully!');
      this.model = {
        fullName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        passportNumber: '',
        passportExpiryDate: '',
        email: '',
        phone: '',
        travelDate: '',
        preferredCity: '',
        visaRequired: false,
        isSelfFunded: false,
        sponsorName: '',
        username: '',
        password: '',
        roleId: 4,
      };
    });
  }
}
